import { Position } from "@app/components";
import Entity, { compareEntities } from "@app/Entity";
import EntityList from "@app/EntityList";
import {
  EventCallback,
  EventHandler,
  EventMap,
  EventName,
  EventNames,
} from "@app/events";
import HashMap from "@app/HashMap";
import bfs from "@app/logic/bfs";
import { EntityWithComponents, getEntityTree } from "@app/logic/entity";
import MenuMode from "@app/MenuMode";
import instantiate, { PrefabName } from "@app/prefabs";
import isDefined from "@app/tools/isDefined";
import { fromEntries } from "@app/tools/object";
import { intPosition, isSameCell } from "@app/tools/position";
import GameMode from "@app/types/GameMode";
import KillReason from "@app/types/KillReason";
import { BlendMode, Cell, Console, Terminal } from "wglt";

type Overlay = HashMap<Position, number>;

export default class Engine implements EventHandler {
  lastEntityId: number;

  map: Console;
  entities: EntityList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventCallbacks!: Record<EventName, EventCallback<any>[]>;
  overlays: Map<string, Overlay>;
  player!: EntityWithComponents<["pilot", "player", "position", "ship"]>;
  mode!: GameMode;

  constructor(
    public term: Terminal,
    public mapWidth: number,
    public mapHeight: number
  ) {
    term.update = this.update.bind(this);

    this.map = new Console(mapWidth, mapHeight, () => true);
    this.lastEntityId = 0;
    this.entities = new EntityList(compareEntities);
    this.overlays = new Map();

    this.clearEventHandlers();
    this.setMode(new MenuMode(this));
  }

  setMode(mode: GameMode) {
    this.mode = mode;
    this.mode.init();
  }

  clearEventHandlers() {
    this.eventCallbacks = fromEntries(EventNames.map((n) => [n, []]));
  }

  fire<T extends EventName>(name: T, data: EventMap[T]): void {
    for (const cb of this.eventCallbacks[name]) cb(data);
  }

  on<T extends EventName>(name: T, handler: EventCallback<T>): void {
    this.eventCallbacks[name].push(handler);
  }

  spawn(name: PrefabName) {
    return instantiate(this, name);
  }

  refresh() {
    this.mode.refresh();
  }

  add(e: Entity) {
    this.refresh();
    this.entities.add(e);
    this.fire("spawn", { e });
    return e;
  }

  kill(e: Entity, reason: KillReason) {
    if (e.alive) {
      e.kill(reason);
      this.fire("kill", { e, reason });
    }
  }

  move(e: Entity, pos: Position) {
    const old = e.position;
    e.move(pos.x, pos.y);
    if (old) this.fire("move", { e, old, pos });
  }

  blankMap() {
    const { map, mapHeight, mapWidth } = this;
    map.clear();

    for (let y = 0; y < mapHeight; y++)
      for (let x = 0; x < mapWidth; x++) {
        // TODO draw something? :D
        map.setBlocked(x, y, false);
        map.setBlockedSight(x, y, false);
      }

    map.computeFov(0, 0, Infinity);
  }

  drawIfVisible(
    x: number,
    y: number,
    g: string | number,
    fg?: number,
    bg?: number,
    bm?: BlendMode
  ) {
    if (this.map.isVisible(x, y)) {
      if (bm) this.term.drawCell(x, y, { bg } as Cell, bm);
      else this.term.drawChar(x, y, g, fg, bg);
    }
  }

  blend(x: number, y: number, bg: number) {
    this.term.drawCell(x, y, { bg } as Cell, BlendMode.Add);
  }

  getRoot(e: Entity): Entity {
    return e.attachment ? this.getRoot(e.attachment.parent) : e;
  }

  getContents(
    pos: Position,
    ignoreSolid: number[] = []
  ): { oob?: boolean; wall?: boolean; solid?: Entity; other: Entity[] } {
    const square = intPosition(pos);
    if (!this.inBounds(square)) return { oob: true, other: [] };

    const wall = this.map.isBlocked(square.x, square.y);
    const entities = this.entities
      .get()
      .filter((e) => e.alive && e.position && isSameCell(square, e.position));
    const solid = entities
      .filter((e) => !ignoreSolid.includes(e.id))
      .find((e) => e.solid);

    return { wall, solid, other: entities.filter((e) => !e.solid) };
  }

  tick() {
    this.overlays.clear();
    this.fire("tick", undefined);
    this.entities.clearDead();
  }

  update() {
    this.mode.update();
  }

  inBounds(pos: Position) {
    return (
      pos.x >= 0 &&
      pos.y >= 0 &&
      pos.x < this.mapWidth &&
      pos.y < this.mapHeight
    );
  }

  getDistanceMap(entity: Entity) {
    const key = `${entity.id}.distance`;
    let map = this.overlays.get(key);
    if (!map) {
      map = bfs(
        getEntityTree(this, entity)
          .map((e) => e.position)
          .filter(isDefined),
        this.inBounds.bind(this)
      );
      this.overlays.set(key, map);
    }

    return map;
  }
}
