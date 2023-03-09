import Entity from "@app/Entity";
import { Pilot } from "@app/components";
import PilotStat from "@app/types/PilotStat";

export function putPilotInShip(e: Entity, pilot: Pilot) {
  const { ship } = e;

  if (!ship)
    throw new Error(`Cannot put pilot into entity ${e.name} (no ship)`);

  e.setPilot(pilot);
  ship.maxHp += pilot.body * 4;
}

export function getStat(e: Entity, stat: PilotStat) {
  return e.pilot ? e.pilot[stat] : 0;
}
