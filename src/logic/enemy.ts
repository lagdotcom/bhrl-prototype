import ShipPower, { ShipPowers } from "@app/types/ShipPower";

import { Appearance } from "@app/components";
import { Colors } from "wglt";
import EnemyPilots from "@app/pilots/enemy";
import Engine from "@app/Engine";
import StarPilots from "@app/pilots/star";
import { getEntityTree } from "./entity";
import instantiate from "@app/prefabs";
import oneOf from "@app/tools/oneOf";

const Colours: Record<ShipPower, Partial<Appearance>> = {
  Typical: { fg: Colors.DARK_GRAY },
  Healthy: { fg: Colors.DARK_GREEN },
  Double: { fg: Colors.LIGHT_GRAY },
  Multi: { fg: Colors.DARK_MAGENTA },

  Drain: { fg: Colors.DARK_RED },
  StarPilot: { fg: Colors.YELLOW },
  Mega: { fg: Colors.BLACK, bg: Colors.DARK_MAGENTA },
};
export default Colours;

const powerDifficulty: Record<ShipPower, number> = {
  Typical: 0,
  Healthy: 2,
  Double: 3,
  Multi: 6,

  Drain: 4,
  StarPilot: 8,
  Mega: 20,
};

const ShipPrefabs = [
  "ShipA",
  "ShipB",
  "ShipC",
  "ShipD",
  "ShipE",
  "ShipF",
  "ShipG",
  "ShipH",
  "DroneA",
  "DroneB",
  "DroneC",
  "CruiseyWing",
  "Olm",
  "GoutOFlame",
  "Demigod",
] as const;
type ShipPrefab = typeof ShipPrefabs[number];

const prefabDifficulty: Record<ShipPrefab, number> = {
  ShipA: 1,
  ShipB: 1,
  ShipC: 1,
  ShipD: 1,
  ShipE: 1,
  ShipF: 1,
  ShipG: 1,
  ShipH: 1,
  DroneA: 2,
  DroneB: 2,
  DroneC: 2,
  CruiseyWing: 8,
  Olm: 10,
  GoutOFlame: 20,
  Demigod: 40,
};

function getPilot(power: ShipPower) {
  // TODO make sure star pilot doesn't already exist
  if (power === "StarPilot" || power === "Mega") return oneOf(StarPilots);
  return oneOf(EnemyPilots);
}

export function generateEnemy(g: Engine, maxDifficulty: number) {
  while (true) {
    const prefab = oneOf(ShipPrefabs);
    const power = oneOf(ShipPowers);
    const pilot = getPilot(power);
    const difficulty =
      powerDifficulty[power] + prefabDifficulty[prefab] + pilot.difficulty;

    if (difficulty <= maxDifficulty) {
      // TODO give AI
      const entity = instantiate(g, prefab).setPilot(pilot);

      // TODO set hp, weapons, etc.

      const appearance = Colours[power];
      for (const part of getEntityTree(g, entity)) {
        if (part.appearance) Object.assign(part.appearance, appearance);
      }

      return { entity, difficulty };
    }
  }
}
