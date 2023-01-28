import { Colors, Console, Terminal } from "wglt";
import Entity, { compareEntities } from "@app/Entity";
import instantiate, { PrefabName } from "@app/prefabs";
import int, { intPosition } from "@app/tools/int";

import { Position } from "@app/components";
import SortedList from "@app/SortedList";
import angleDiff from "@app/tools/angleDiff";
import angleMove from "@app/tools/angleMove";
import turretReducer from "@app/logic/turretReducer";
import walkGrid from "@app/walkGrid";

const MAP_WIDTH = 60;
const MAP_HEIGHT = 40;

export default class Engine {
  lastEntityId: number;

  dirty: boolean;
  fovRecompute: boolean;
  map: Console;
  entities: SortedList<Entity>;

  constructor(public term: Terminal) {
    term.update = this.update.bind(this);

    this.dirty = true;
    this.fovRecompute = true;
    this.map = new Console(MAP_WIDTH, MAP_HEIGHT, () => true);
    this.lastEntityId = 0;
    this.entities = new SortedList(compareEntities);
  }

  get player() {
    const player = this.entities.get().find((e) => e.player);
    if (!player) throw new Error("Could not find a player!");
    return player;
  }

  spawn(name: PrefabName) {
    return instantiate(this, name);
  }

  add(e: Entity) {
    this.dirty = true;
    this.entities.add(e);
  }

  addMany(es: Entity[]) {
    this.dirty = true;
    for (const e of es) this.add(e);
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

  draw() {
    const { map, player, term, entities } = this;

    if (this.fovRecompute) {
      map.computeFov(player.position!.x, player.position!.y, 20);
      this.fovRecompute = false;
    }

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const cell = map.grid[y][x];
        const visible = map.isVisible(x, y);
        const wall = cell.blockedSight;
        let color = Colors.BLACK;

        if (visible) {
          // It's visible
          color = wall ? Colors.WHITE : Colors.DARK_GRAY;
          cell.explored = true;
        } else if (cell.explored) {
          // It's remembered
          color = wall ? Colors.LIGHT_GRAY : Colors.BLACK;
        }

        term.drawChar(x, y, 0, 0, color);
      }
    }

    const draw = (x: number, y: number, g: string, f?: number, b?: number) => {
      if (map.isVisible(x, y)) term.drawChar(x, y, g, f, b);
    };

    for (const e of entities.get()) {
      const { appearance, position } = e;

      if (appearance && position)
        draw(
          int(position.x),
          int(position.y),
          appearance.glyph,
          appearance.fg,
          appearance.bg
        );
    }

    this.dirty = false;
  }

  getRootID(e: Entity): number {
    return e.attachment ? this.getRootID(e.attachment.parent) : e.id;
  }

  getContents(pos: Position) {
    const ipos = { x: int(pos.x), y: int(pos.y) };

    const wall = this.map.isBlocked(ipos.x, ipos.y);
    const entities = this.entities
      .get()
      .filter(
        (e) => int(e.position?.x) === ipos.x && int(e.position?.y) == ipos.y
      );
    const solid = entities.find((e) => e.solid);

    return { wall, solid, other: entities.filter((e) => !e.solid) };
  }

  lifetimes() {
    for (const e of this.entities.get()) {
      const { lifetime } = e;

      if (lifetime) {
        if (--lifetime.duration <= 0) e.kill();
      }
    }
  }

  homing() {
    const playerPos = this.player.position!;

    for (const e of this.entities.get()) {
      const { homing, motion, position } = e;

      if (homing && motion && position) {
        const desired = Math.atan2(
          playerPos.y - position.y,
          playerPos.x - position.x
        );
        const diff = angleDiff(motion.angle, desired);

        if (Math.abs(diff) <= homing.strength) motion.angle = desired;
        else if (diff < 0) motion.angle -= homing.strength;
        else motion.angle += homing.strength;

        if (--homing.duration <= 0) {
          e.setHoming();
          e.setTrail();
        }
      }
    }
  }

  turrets() {
    const { entities } = this;
    const playerPos = this.player.position!;

    for (const e of entities.get()) {
      const { position, turret } = e;
      if (position && turret) {
        turretReducer(turret);
        if (turret.mode === "fire") {
          this.spawn(turret.bulletPrefab)
            .setIgnoreSolid({ ids: [this.getRootID(e)] })
            .setPosition({ x: position.x + 0.5, y: position.y + 0.5 })
            .setMotion({
              angle: Math.atan2(
                playerPos.y - position.y,
                playerPos.x - position.x
              ),
              vel: turret.bulletVelocity,
            });
        }
      }
    }
  }

  motion() {
    const { entities } = this;

    for (const e of entities.get()) {
      const { ignoreSolid, motion, position, trail } = e;

      if (position && motion) {
        const src = { ...position };
        const [dx, dy] = angleMove(motion);

        const dst = { x: position.x + dx, y: position.y + dy };

        const line = walkGrid(intPosition(src), intPosition(dst));

        let reached = src;
        let hitWall = false;
        let hitEntity: Entity | undefined = undefined;
        for (const pos of line) {
          reached = pos;

          const { wall, solid } = this.getContents(pos);
          if (wall) {
            hitWall = true;
            break;
          } else if (
            solid &&
            !ignoreSolid?.ids.includes(this.getRootID(solid))
          ) {
            hitEntity = solid;
            break;
          }

          if (trail && pos !== line.slice(-1)[0])
            this.spawn(trail.effectPrefab).setPosition(pos);
        }

        if (hitWall) {
          e.kill();
        } else if (hitEntity) {
          // TODO damage etc.
          e.kill();
        } else {
          e.move(dst.x, dst.y);
        }

        if (!e.alive) {
          // TODO explode etc.
        }
      }
    }
  }

  kills() {
    for (const e of this.entities.get()) {
      if (!e.alive) this.entities.delete(e);
    }
  }

  tick() {
    this.lifetimes();
    this.homing();
    this.turrets();
    this.motion();
    this.kills();
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
