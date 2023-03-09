import {
  AI,
  Appearance,
  Attachment,
  ComponentMap,
  DelayedShot,
  DoubleShot,
  Explodes,
  Field,
  Homing,
  IgnoreSolid,
  Item,
  LastMovement,
  Lifetime,
  Motion,
  Origin,
  Pilot,
  Player,
  Position,
  Projectile,
  Ship,
  Trail,
  Turret,
} from "@app/components";
import { clone, keys } from "@app/tools/object";

import Engine from "@app/Engine";
import KillReason from "@app/types/KillReason";
import Prefab from "@app/types/Prefab";
import { PrefabName } from "@app/prefabs";

export default class Entity implements Partial<ComponentMap> {
  alive: boolean;
  id: number;
  tags: Set<string>;

  prefab?: PrefabName;
  ai?: AI;
  appearance?: Appearance;
  attachment?: Attachment;
  delayedShot?: DelayedShot;
  doubleShot?: DoubleShot;
  explodes?: Explodes;
  field?: Field;
  homing?: Homing;
  ignoreSolid?: IgnoreSolid;
  item?: Item;
  lastMovement?: LastMovement;
  lifetime?: Lifetime;
  motion?: Motion;
  origin?: Origin;
  pilot?: Pilot;
  player?: Player;
  projectile?: Projectile;
  position?: Position;
  ship?: Ship;
  solid: boolean;
  trail?: Trail;
  turret?: Turret;

  constructor(public g: Engine, public name?: string) {
    this.alive = true;
    this.id = ++g.lastEntityId;
    this.solid = false;
    this.tags = new Set();
  }

  applyPrefab(name: PrefabName, prefab: Prefab): this {
    this.prefab = name;

    if (prefab.components) Object.assign(this, clone(prefab.components));

    if (prefab.children)
      for (const { name, x, y, overlay, tags } of prefab.children) {
        const child = this.g.spawn(name).setAttachment({ parent: this, x, y });
        if (overlay)
          for (const key of keys(overlay))
            Object.assign((child as any)[key], clone(overlay[key]));
        if (tags) for (const tag of tags) child.tags.add(tag);
      }

    return this;
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  kill(reason: KillReason): this {
    this.alive = false;
    this.eachChild((e) => this.g.kill(e, reason));
    return this;
  }

  eachChild(callback: (e: Entity, at: Attachment) => void) {
    for (const e of this.g.entities.get()) {
      if (e.attachment?.parent === this) callback(e, e.attachment);
    }
  }

  setAI(c?: AI): this {
    this.ai = c;
    return this;
  }

  setAppearance(c?: Appearance): this {
    this.g.refresh();
    this.appearance = c;
    return this;
  }

  setAttachment(c?: Attachment): this {
    this.attachment = c;
    return this;
  }

  setDelayedShot(c?: DelayedShot): this {
    this.delayedShot = c;
    return this;
  }

  setDoubleShot(c?: DoubleShot): this {
    this.doubleShot = c;
    return this;
  }

  setExplodes(c?: Explodes): this {
    this.explodes = c;
    return this;
  }

  setField(c?: Field): this {
    this.field = c;
    return this;
  }

  setHoming(c?: Homing): this {
    this.homing = c;
    return this;
  }

  setIgnoreSolid(c?: IgnoreSolid): this {
    this.ignoreSolid = c;
    return this;
  }

  setItem(c?: Item): this {
    this.item = c;
    return this;
  }

  setLastMovement(c?: LastMovement): this {
    this.lastMovement = c;
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

  setOrigin(c?: Origin): this {
    this.origin = c;
    return this;
  }

  setPilot(c?: Pilot): this {
    this.pilot = c;
    return this;
  }

  setPosition(c?: Position): this {
    this.g.refresh();
    this.position = c;
    return this;
  }

  setShip(c?: Ship): this {
    this.ship = c;
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

  setPlayer(c?: Player): this {
    this.player = c;
    return this;
  }

  setProjectile(c?: Projectile): this {
    this.projectile = c;
    return this;
  }

  setSolid(tag: boolean): this {
    this.solid = tag;
    return this;
  }

  move(x: number, y: number): this {
    this.g.refresh();
    this.position = { x, y };
    this.eachChild((e, at) => e.move(x + at.x, y + at.y));
    return this;
  }
}

export function compareEntities(a: Entity, b: Entity) {
  const layerA = a.appearance?.layer ?? 0;
  const layerB = b.appearance?.layer ?? 0;
  if (layerA !== layerB) return layerA - layerB;

  return a.id - b.id;
}
