import Engine from "@app/Engine";
import Entity from "@app/Entity";
import DamageSource from "@app/types/DamageSource";

export default function damage(
  g: Engine,
  hit: Entity,
  amount: number,
  inflicter: Entity
) {
  const e = g.getRoot(hit);
  if (!e.ship) return;

  // friendly fire!
  if (e.ship.type !== "Player" && inflicter.origin?.ship.type !== "Player")
    amount = Math.ceil(amount / 2);

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

  console.log(
    `${inflicter.name}${
      inflicter.origin
        ? ` (${inflicter.origin.owner.name} #${inflicter.origin.owner.id})`
        : ""
    } hits ${e.name} for ${amount}`
  );
  g.fire("damage", { e, amount, source });

  if (e.ship.hp <= 0) g.kill(e, { type: "damage", source });
}
