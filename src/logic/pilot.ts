import { Pilot } from "@app/components";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { getEntityMidpoint } from "@app/logic/entity";
import { intPosition } from "@app/tools/position";
import PilotStat from "@app/types/PilotStat";
import ScaledValue from "@app/types/ScaledValue";

export function putPilotInShip(g: Engine, e: Entity, pilot: Pilot) {
  const { ship } = e;

  if (!ship)
    throw new Error(`Cannot put pilot into entity ${e.name} (no ship)`);

  e.setPilot(pilot);
  ship.maxHp += getHPBonus(e);

  if (pilot.special) {
    const pos = getEntityMidpoint(g, e);
    const special = g
      .spawn(pilot.special)
      .setAttachment({ ...intPosition(pos), parent: e });
    special.tags.add("Special");
  }
}

export function getStat(e: Entity, stat: PilotStat) {
  return e.pilot ? e.pilot[stat] : 0;
}

export function getShieldRechargeDelay(e: Entity) {
  return 7 - getStat(e, "body");
}

export function getHPBonus(e: Entity) {
  return getStat(e, "body") * 4;
}

export function getMaxBombCount(e: Entity) {
  return getStat(e, "mind");
}

export function getJunkBombChance(e: Entity) {
  return (getStat(e, "mind") - 1) * 5;
}

export function getScaledValue(sv: ScaledValue, e: Entity) {
  if (typeof sv === "number") return sv;
  return Math.floor(sv.base + getStat(e, sv.stat) * sv.multiplier);
}
