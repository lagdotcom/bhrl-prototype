import { Colors, Console, Terminal } from "wglt";
import Entity, { compareEntities } from "@app/Entity";
import instantiate, { PrefabName } from "@app/prefabs";

import SortedList from "@app/SortedList";
import { System } from "detect-collisions";
import angleDiff from "@app/tools/angleDiff";
import angleMove from "@app/tools/angleMove";
import int from "@app/tools/int";
import turretReducer from "@app/logic/turretReducer";

const MAP_WIDTH = 60;
const MAP_HEIGHT = 40;

type BodyTag = { type: "wall" | "ship" | "bullet" | "player"; e?: Entity };
function tag<T>(body: T, tag: BodyTag) {
  (body as any).tag = tag;
  return body;
}

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

  lifetimes() {
    for (const e of this.entities.get()) {
      const { lifetime } = e;

      if (lifetime) {
        if (--lifetime.duration <= 0) e.kill();
      }
    }
  }

  trails() {
    for (const e of this.entities.get()) {
      const { position, trail } = e;

      if (position && trail) {
        this.spawn(trail.effectPrefab).setPosition(position);
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

        if (--homing.duration <= 0) e.setHoming();
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
    const { entities, map, player } = this;
    const physics = new System();

    // insert walls
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        if (map.isBlocked(x, y)) {
          tag(physics.createBox({ x, y }, 1, 1, { isStatic: true }), {
            type: "wall",
          });
        }
      }
    }

    // insert ships
    for (const e of entities.get()) {
      const { solid, motion, position, projectile } = e;

      if (position) {
        const { x, y } = position;

        if (solid) {
          // insert ships
          tag(physics.createBox({ x, y }, 1, 1), { type: "ship", e });
        } else if (projectile && motion) {
          const [dx, dy] = angleMove(motion);

          // insert bullets
          const newPos = { x: x + dx, y: y + dy };

          tag(physics.createBox({ x: x - 0.25, y: y - 0.25 }, 0.5, 0.5), {
            type: "bullet",
            e,
          });
          tag(
            physics.createBox(
              { x: newPos.x - 0.5, y: newPos.y - 0.25 },
              0.5,
              0.5
            ),
            { type: "bullet", e }
          );
          tag(physics.createLine({ x, y }, newPos), { type: "bullet", e });

          e.move(newPos.x, newPos.y);
        }
      }
    }

    // insert player
    tag(physics.createBox(player.position!, 1, 1), { type: "player" });

    physics.update();
    physics.checkAll((r) => {
      const a = r.a.tag as BodyTag;
      const b = r.b.tag as BodyTag;

      if (a.type === "wall") {
        if (b.e?.projectile) {
          // console.log("killed", b);
          b.e.kill();
        }
        return;
      }
      if (b.type === "wall") {
        if (a.e?.projectile) {
          // console.log("killed", a);
          a.e.kill();
        }
        return;
      }

      if (a.type === "player" && b.type === "bullet" && b.e?.alive) {
        // console.log(b, "hits", a);
        b.e.kill();
      } else if (b.type === "player" && a.type === "bullet" && a.e?.alive) {
        // console.log(a, "hits", b);
        a.e.kill();
      }
    });
  }

  kills() {
    for (const e of this.entities.get()) {
      if (!e.alive) this.entities.delete(e);
    }
  }

  tick() {
    this.lifetimes();
    this.trails();
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
