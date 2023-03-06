import { DamageSource } from "@app/events";
import Engine from "@app/Engine";
import Entity from "@app/Entity";

export default function damage(
  g: Engine,
  hit: Entity,
  amount: number,
  inflicter: Entity
) {
  const e = g.getRoot(hit);
  if (!e.ship) return;

  let damageToHp = amount;

  if (e.ship.shield > 0) {
    if (e.ship.shield > amount) {
      e.ship.shield -= amount;
      damageToHp = 0;
    } else {
      damageToHp -= e.ship.shield;
      e.ship.shield = 0;
    }
  }
  if (damageToHp) e.ship.hp -= damageToHp;

  const source: DamageSource = { e: inflicter, owner: inflicter };
  if (inflicter.origin) {
    source.owner = inflicter.origin.owner;
    source.ship = inflicter.origin.ship;
    source.turret = inflicter.origin.turret;
  }

  console.log(inflicter.name, "hits", e.name, "for", amount);
  g.fire("damage", { e, amount, source });

  if (e.ship.hp <= 0) g.kill(e, source);
}
