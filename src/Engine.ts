import { Colors, Console, Terminal } from "wglt";
import Entity, { compareEntities } from "./Entity";
import { Line, System } from "detect-collisions";

import Motion from "./components/Motion";
import Position from "./components/Position";
import SortedSet from "./SortedSet";
import getBattleship from "./prefabs/Battleship";
import getBullet from "./prefabs/Bullet";
import getPlayer from "./prefabs/Player";
import int from "./tools/int";
import { turretReducer } from "./components/Turret";

const MAP_WIDTH = 60;
const MAP_HEIGHT = 40;

export default class Engine {
  lastEntityId: number;

  fovRecompute: boolean;
  map: Console;
  entities: SortedSet<Entity>;
  player!: Entity;

  constructor(public term: Terminal) {
    term.update = this.update.bind(this);

    this.fovRecompute = true;
    this.map = new Console(MAP_WIDTH, MAP_HEIGHT, () => true);
    this.lastEntityId = 0;
    this.entities = new SortedSet(compareEntities);
  }

  add(e: Entity) {
    this.entities.add(e);
    if (e.Player) this.player = e;
  }

  addMany(es: Entity[]) {
    for (const e of es) this.add(e);
  }

  gotoDemoRoom() {
    this.entities.clear();

    this.map.clear();
    this.room(1, 1, 40, 30);
    this.add(getPlayer(this).setPosition(new Position(5, 25)));

    const { ship, parts } = getBattleship(this);
    this.add(ship);
    this.addMany(parts);
    ship.move(8, 5);
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
      map.computeFov(player.Position!.x, player.Position!.y, 20);
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

    const draw = (x: number, y: number, g: string, f: number, b?: number) => {
      if (map.isVisible(x, y)) term.drawChar(x, y, g, f, b);
    };

    for (const e of entities.get()) {
      const { Appearance, Position } = e;

      if (Appearance && Position)
        draw(
          int(Position.x),
          int(Position.y),
          Appearance.glyph,
          Appearance.fg,
          Appearance.bg
        );
    }
  }

  turrets() {
    const { entities } = this;
    const playerPos = this.player.Position!;

    for (const e of entities.get()) {
      const { Position, Turret } = e;
      if (Position && Turret) {
        turretReducer(Turret);
        if (Turret.mode === "fire") {
          const bullet = getBullet(this)
            .setPosition({ x: Position.x + 0.5, y: Position.y + 0.5 })
            .setMotion(
              Motion.fromAngleAndVelocity(
                Math.atan2(playerPos.y - Position.y, playerPos.x - Position.x),
                Turret.bulletVelocity
              )
            );
          entities.add(bullet);
        }
      }
    }
  }

  motion() {
    // const { entities, map } = this;

    // for (const e of entities.get()) {
    //   const { Motion, Position } = e;

    //   if (Motion && Position) {
    //     const newPos = e.move(Position.x + Motion.x, Position.y + Motion.y);

    //     if (map.isBlocked(int(newPos.x), int(newPos.y)) && e.Projectile)
    //       entities.delete(e);
    //   }
    // }

    const { entities, map, player } = this;
    const physics = new System();
    const bits = new Map<
      string,
      | { type: "wall" }
      | { type: "ship"; e: Entity }
      | { type: "bullet"; e: Entity }
      | { type: "player" }
    >();

    // insert walls
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        if (map.isBlocked(x, y)) {
          const wall = physics.createBox({ x, y }, 1, 1, { isStatic: true });
          bits.set(wall.uid, { type: "wall" });
        }
      }
    }

    // insert ships
    for (const e of entities.get()) {
      const { Solid, Motion, Position, Projectile } = e;

      if (Position) {
        const { x, y } = Position;

        if (Solid) {
          // insert ships
          const ship = physics.createBox({ x, y }, 1, 1);
          bits.set(ship.uid, { type: "ship", e });
        } else if (Projectile && Motion) {
          // insert bullets
          const newPos = { x: x + Motion.x, y: y + Motion.y };

          const old = physics.createBox({ x: x - 0.25, y: y - 0.25 }, 0.5, 0.5);
          bits.set(old.uid, { type: "bullet", e });
          const nu = physics.createBox(
            { x: newPos.x - 0.5, y: newPos.y - 0.25 },
            0.5,
            0.5
          );
          bits.set(nu.uid, { type: "bullet", e });
          const line = physics.createLine({ x, y }, newPos);
          bits.set(line.uid, { type: "bullet", e });

          e.move(newPos.x, newPos.y);
        }
      }
    }

    // insert player
    const pbox = physics.createBox(player.Position!, 1, 1);
    bits.set(pbox.uid, { type: "player" });

    physics.update();
    physics.checkAll((r) => {
      const a = bits.get(r.a.uid);
      const b = bits.get(r.b.uid);
      if (!a || !b) return;

      if (a.type === "wall") {
        if (b instanceof Entity && b.Projectile) {
          // console.log("killed", b);
          entities.delete(b);
        }
        return;
      }
      if (b.type === "wall") {
        if (a instanceof Entity && a.Projectile) {
          // console.log("killed", a);
          entities.delete(a);
        }
        return;
      }

      if (a.type === "player" && b.type === "bullet" && b.e.alive) {
        // console.log(b, "hits", a);
        b.e.kill();
        entities.delete(b.e);
      } else if (b.type === "player" && a.type === "bullet" && a.e.alive) {
        // console.log(a, "hits", b);
        a.e.kill();
        entities.delete(a.e);
      }
    });
  }

  tick() {
    this.turrets();
    this.motion();
  }

  handleKeys() {
    const { map, player, term } = this;

    const move = term.getMovementKey();
    if (move) {
      const dx = player.Position!.x + move.x;
      const dy = player.Position!.y + move.y;

      if (!map.isBlocked(dx, dy)) {
        player.move(dx, dy);
        this.fovRecompute = true;

        this.tick();
      }
    }
  }

  update() {
    this.handleKeys();
    this.draw();
  }
}
