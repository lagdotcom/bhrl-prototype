import { BlendMode, Cell, Colors, Console, Terminal } from "wglt";
import Entity, { compareEntities } from "@app/Entity";
import { EventCallback, EventHandler, EventMap, EventName } from "@app/events";
import instantiate, { PrefabName } from "@app/prefabs";

import EntityList from "@app/EntityList";
import { Position } from "@app/components";
import { addSystems } from "./systems";
import int from "@app/tools/int";

const MAP_WIDTH = 60;
const MAP_HEIGHT = 40;

export default class Engine implements EventHandler {
  lastEntityId: number;

  dirty: boolean;
  fovRecompute: boolean;
  map: Console;
  entities: EntityList;
  eventCallbacks: Record<EventName, EventCallback<any>[]>;

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

    this.eventCallbacks = { draw: [], kill: [], move: [], spawn: [], tick: [] };
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

  delete(e: Entity) {
    if (e.alive) {
      e.kill();
      this.fire("kill", { e });
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

  drawAt(
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

  draw() {
    const { map, mapWidth, mapHeight, player } = this;

    if (this.fovRecompute) {
      map.computeFov(player.position!.x, player.position!.y, 20);
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

        this.drawAt(x, y, 0, 0, bg);
      }
    }

    this.fire("draw", undefined);
    this.dirty = false;
  }

  getRootID(e: Entity): number {
    return e.attachment ? this.getRootID(e.attachment.parent) : e.id;
  }

  getContents(pos: Position) {
    const square = { x: int(pos.x), y: int(pos.y) };

    const wall = this.map.isBlocked(square.x, square.y);
    const entities = this.entities
      .get()
      .filter(
        (e) => int(e.position?.x) === square.x && int(e.position?.y) == square.y
      );
    const solid = entities.find((e) => e.solid);

    return { wall, solid, other: entities.filter((e) => !e.solid) };
  }

  tick() {
    this.fire("tick", undefined);
    this.entities.clearDead();
  }

  handleKeys() {
    const { map, player, term } = this;

    const move = term.getMovementKey();
    if (move) {
      const dx = player.position!.x + move.x;
      const dy = player.position!.y + move.y;

      if (!map.isBlocked(dx, dy)) {
        player.move(dx, dy);
        this.fovRecompute = true;

        this.tick();
      }
    }
  }

  update() {
    this.handleKeys();
    if (this.dirty) this.draw();
  }
}
