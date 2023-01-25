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
  appearance?: Appearance;
  attachment?: Attachment;
  homing?: Homing;
  lifetime?: Lifetime;
  motion?: Motion;
  player: boolean;
  projectile: boolean;
  position?: Position;
  solid: boolean;
  trail?: Trail;
  turret?: Turret;

  constructor(public g: Engine, public name?: string) {
    this.alive = true;
    this.id = ++g.lastEntityId;
    this.player = false;
    this.projectile = false;
    this.solid = false;

    g.add(this);
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  kill(): this {
    this.alive = false;
    this.eachChild((e) => e.kill());
    return this;
  }

  eachChild(callback: (e: Entity, at: Attachment) => void) {
    for (const e of this.g.entities.get()) {
      if (e.attachment?.parent === this) callback(e, e.attachment);
    }
  }

  setAppearance(c?: Appearance): this {
    this.g.dirty = true;
    this.appearance = c;
    return this;
  }

  setAttachment(c?: Attachment): this {
    this.attachment = c;
    return this;
  }

  setHoming(c?: Homing): this {
    this.homing = c;
    return this;
  }

  setLifetime(c?: Lifetime): this {
    this.lifetime = c;
    return this;
  }

  setMotion(c?: Motion): this {
    this.motion = c;
    return this;
  }

  setPosition(c?: Position): this {
    this.g.dirty = true;
    this.position = c;
    return this;
  }

  setTrail(c?: Trail): this {
    this.trail = c;
    return this;
  }

  setTurret(c?: Turret): this {
    this.turret = c;
    return this;
  }

  setPlayer(tag: boolean): this {
    this.player = tag;
    return this;
  }

  setProjectile(tag: boolean): this {
    this.projectile = tag;
    return this;
  }

  setSolid(tag: boolean): this {
    this.solid = tag;
    return this;
  }

  move(x: number, y: number) {
    this.g.dirty = true;
    this.position = { x, y };
    this.eachChild((e, at) => e.move(x + at.x, y + at.y));
    return this.position;
  }
}

export function compareEntities(a: Entity, b: Entity) {
  const layerA = a.appearance?.layer ?? 0;
  const layerB = b.appearance?.layer ?? 0;
  if (layerA !== layerB) return layerA - layerB;

  return a.id - b.id;
}
