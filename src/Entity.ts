import Appearance from "./components/Appearance";
import Attachment from "./components/Attachment";
import Engine from "./Engine";
import Homing from "./components/Homing";
import Lifetime from "./components/Lifetime";
import Motion from "./components/Motion";
import Position from "./components/Position";
import Trail from "./components/Trail";
import Turret from "./components/Turret";

export default class Entity {
  alive: boolean;
  id: number;
  Appearance?: Appearance;
  Attachment?: Attachment;
  Homing?: Homing;
  Lifetime?: Lifetime;
  Motion?: Motion;
  Player: boolean;
  Projectile: boolean;
  Position?: Position;
  Solid: boolean;
  Trail?: Trail;
  Turret?: Turret;

  constructor(public g: Engine, public name?: string) {
    this.alive = true;
    this.id = ++g.lastEntityId;
    this.Player = false;
    this.Projectile = false;
    this.Solid = false;

    g.add(this);
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  kill(): this {
    this.alive = false;
    return this;
  }

  eachChild(callback: (e: Entity, at: Attachment) => void) {
    for (const e of this.g.entities.get()) {
      if (e.Attachment?.parent === this) callback(e, e.Attachment);
    }
  }

  setAppearance(c?: Appearance): this {
    this.g.dirty = true;
    this.Appearance = c;
    return this;
  }

  setAttachment(c?: Attachment): this {
    this.Attachment = c;
    return this;
  }

  setHoming(c?: Homing): this {
    this.Homing = c;
    return this;
  }

  setLifetime(c?: Lifetime): this {
    this.Lifetime = c;
    return this;
  }

  setMotion(c?: Motion): this {
    this.Motion = c;
    return this;
  }

  setPosition(c?: Position): this {
    this.g.dirty = true;
    this.Position = c;
    return this;
  }

  setTrail(c?: Trail): this {
    this.Trail = c;
    return this;
  }

  setTurret(c?: Turret): this {
    this.Turret = c;
    return this;
  }

  setPlayer(tag: boolean): this {
    this.Player = tag;
    return this;
  }

  setProjectile(tag: boolean): this {
    this.Projectile = tag;
    return this;
  }

  setSolid(tag: boolean): this {
    this.Solid = tag;
    return this;
  }

  move(x: number, y: number) {
    this.g.dirty = true;
    this.Position = new Position(x, y);
    this.eachChild((e, at) => e.move(x + at.x, y + at.y));
    return this.Position;
  }
}

export function compareEntities(a: Entity, b: Entity) {
  const layerA = a.Appearance?.layer ?? 0;
  const layerB = b.Appearance?.layer ?? 0;
  if (layerA !== layerB) return layerA - layerB;

  return a.id - b.id;
}
