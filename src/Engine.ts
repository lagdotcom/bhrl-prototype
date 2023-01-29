import { BlendMode, Cell, Colors, Console, Key, Terminal } from "wglt";
import Entity, { compareEntities } from "@app/Entity";
import { EventCallback, EventHandler, EventMap, EventName } from "@app/events";
import instantiate, { PrefabName } from "@app/prefabs";
import { intPosition, isSameCell } from "@app/tools/position";

import EntityList from "@app/EntityList";
import { Position } from "@app/components";
import { addSystems } from "@app/systems";
import { fireAirFist } from "@app/logic/airFist";
import { getEntityMidpoint } from "@app/logic/entity";

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

    this.eventCallbacks = {
      draw: [],
      kill: [],
      move: [],
      playerMove: [],
      spawn: [],
      tick: [],
    };
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

        // TODO scrolling etc.
        term.drawChar(x, y, 0, 0, bg);
      }
    }

    this.fire("draw", undefined);
    this.dirty = false;
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
}
