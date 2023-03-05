import Entity from "@app/Entity";
import { Pilot } from "@app/components";

export function putPilotInShip(e: Entity, pilot: Pilot) {
  const { ship } = e;

  if (!ship)
    throw new Error(`Cannot put pilot into entity ${e.name} (no ship)`);

  e.setPilot(pilot);
  ship.maxHp += pilot.body;
}
