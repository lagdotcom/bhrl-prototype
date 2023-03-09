import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { Pilot } from "@app/components";
import PilotStat from "@app/types/PilotStat";
import { getEntityMidpoint } from "@app/logic/entity";
import { intPosition } from "@app/tools/position";

export function putPilotInShip(g: Engine, e: Entity, pilot: Pilot) {
  const { ship } = e;

  if (!ship)
    throw new Error(`Cannot put pilot into entity ${e.name} (no ship)`);

  e.setPilot(pilot);
  ship.maxHp += pilot.body * 4;

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
