import { BlendMode, Cell, Colors, Console, Key, Terminal } from "wglt";
import Entity, { compareEntities } from "@app/Entity";
import {
  EventCallback,
  EventHandler,
  EventMap,
  EventName,
  EventNames,
} from "@app/events";
import { getEntityMidpoint, getEntityTree } from "@app/logic/entity";
import instantiate, { PrefabName } from "@app/prefabs";
import { intPosition, isSameCell } from "@app/tools/position";

import EntityList from "@app/EntityList";
import HashMap from "@app/HashMap";
import { Position } from "@app/components";
import { addSystems } from "@app/systems";
import bfs from "@app/logic/bfs";
import { fireAirFist } from "@app/logic/airFist";
import { fromEntries } from "@app/tools/object";
import isDefined from "@app/tools/isDefined";

const MAP_WIDTH = 60;
const MAP_HEIGHT = 40;

type Overlay = HashMap<Position, number>;

export default class Engine implements EventHandler {
  lastEntityId: number;

  dirty: boolean;
  fovRecompute: boolean;
  map: Console;
  entities: EntityList;
  eventCallbacks: Record<EventName, EventCallback<any>[]>;
  overlays: Map<string, Overlay>;
  showOverlay?: string;

  constructor(
    public term: Terminal,
    public mapWidth = MAP_WIDTH,
    public mapHeight = MAP_HEIGHT
  ) {
    term.update = this.update.bind(this);

    this.dirty = true;
    this.fovRecompute = true;
    this.map = new Console(mapWidth, mapHeight, () => true);
    this.lastEntityId = 0;
    this.entities = new EntityList(compareEntities);
    this.overlays = new Map();

    this.eventCallbacks = fromEntries(EventNames.map((n) => [n, []]));
    addSystems(this);
  }

  get player() {
    const player = this.entities.get().find((e) => e.player);
    if (!player) throw new Error("Could not find a player!");
    return player;
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

  add(e: Entity) {
    this.dirty = true;
    this.entities.add(e);
    this.fire("spawn", { e });
    return e;
  }

  kill(e: Entity, by?: Entity) {
    if (e.alive) {
      e.kill(by);
      this.fire("kill", { e, by });
    }
  }

  move(e: Entity, pos: Position) {
    const old = e.position;
    e.move(pos.x, pos.y);
    if (old) this.fire("move", { e, old, pos });
  }

  gotoDemoRoom() {
    this.entities.clear();

    this.map.clear();
    this.room(1, 1, 40, 30);
    this.spawn("Player").move(5, 25);
    this.spawn("Battleship").move(8, 5);
  }

  room(sx: number, sy: number, w: number, h: number) {
    const { map } = this;

    for (let yo = 0; yo < h; yo++) {
      for (let xo = 0; xo < w; xo++) {
        const wall = xo === 0 || yo === 0 || xo === w - 1 || yo === h - 1;
        const x = sx + xo;
        const y = sy + yo;

        map.setBlocked(x, y, wall);
        map.setBlockedSight(x, y, wall);
      }
    }
  }

  drawIfVisible(
    x: number,
    y: number,
    g: string | number,
    fg?: number,
    bg?: number,
    bm?: BlendMode
  ) {
    // TODO scrolling etc.
    if (this.map.isVisible(x, y)) {
      if (bm) this.term.drawCell(x, y, { bg } as Cell, bm);
      else this.term.drawChar(x, y, g, fg, bg);
    }
  }

  draw() {
    const { map, mapWidth, mapHeight, player, term } = this;

    if (this.fovRecompute) {
      map.computeFov(
        player.position!.x,
        player.position!.y,
        player.player!.visionRange
      );
      this.fovRecompute = false;
    }

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const cell = map.grid[y][x];
        const visible = map.isVisible(x, y);
        const wall = cell.blockedSight;
        let bg = Colors.BLACK;

        if (visible) {
          // It's visible
          bg = wall ? Colors.WHITE : Colors.DARK_GRAY;
          cell.explored = true;
        } else if (cell.explored) {
          // It's remembered
          bg = wall ? Colors.LIGHT_GRAY : Colors.BLACK;
        }

        // TODO scrolling etc.
        term.drawChar(x, y, 0, 0, bg);
      }
    }

    this.fire("draw", undefined);
    this.dirty = false;

    if (this.showOverlay) {
      const overlay = this.overlays.get(this.showOverlay);
      if (overlay) {
        for (let y = 0; y < mapHeight; y++) {
          for (let x = 0; x < mapWidth; x++) {
            const value = overlay.get({ x, y }) || Infinity;
            const ch = value === Infinity ? "-" : value < 10 ? `${value}` : "*";
            term.drawChar(x, y, ch, Colors.LIGHT_RED);
          }
        }
      }
    }
  }

  getRoot(e: Entity): Entity {
    return e.attachment ? this.getRoot(e.attachment.parent) : e;
  }

  getContents(pos: Position, ignoreSolid: number[] = []) {
    const square = intPosition(pos);

    const wall = this.map.isBlocked(square.x, square.y);
    const entities = this.entities
      .get()
      .filter((e) => e.position && isSameCell(square, e.position));
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

  handleKeys() {
    const move = this.term.getMovementKey();
    if (move) {
      this.fire("playerMove", { move });
      return;
    }

    if (this.term.isKeyPressed(Key.VK_F)) {
      fireAirFist(this, getEntityMidpoint(this, this.player), 4.5);
      this.tick();
      return;
    }
  }

  update() {
    this.handleKeys();
    if (this.dirty) this.draw();
  }

  saveOverlay(e: Entity, name: string, overlay: Overlay) {
    this.overlays.set(`${e.id}.${name}`, overlay);
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

  damage(hit: Entity, amount: number, inflicter: Entity) {
    const e = this.getRoot(hit);
    if (!e.hull) return;

    e.hull.hp -= amount;
    console.log(inflicter.name, "hits", e.name, "for", amount);
    this.fire("damage", { e, inflicter, amount });

    if (e.hull.hp <= 0) this.kill(e, inflicter);
  }
}
