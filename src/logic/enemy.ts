import { Appearance, Position } from "@app/components";
import ShipPower, { ShipPowers } from "@app/types/ShipPower";

import { Colors } from "wglt";
import EnemyPilots from "@app/pilots/enemy";
import Engine from "@app/Engine";
import StarPilots from "@app/pilots/star";
import enumerate from "@app/tools/enumerate";
import { getEntityTree } from "@app/logic/entity";
import oneOf from "@app/tools/oneOf";
import { putPilotInShip } from "@app/logic/pilot";
import shuffle from "@app/tools/shuffle";

const isDrone = (prefab: ShipPrefab) =>
  ["DroneA", "DroneB", "DroneC"].includes(prefab);

const isHealthy = (power: ShipPower) =>
  ["Healthy", "Multi", "Mega"].includes(power);

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
type ShipPrefab = (typeof ShipPrefabs)[number];

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

function getPilot(prefab: ShipPrefab, power: ShipPower) {
  if (isDrone(prefab)) return undefined;

  // TODO make sure star pilot doesn't already exist
  if (power === "StarPilot" || power === "Mega") return oneOf(StarPilots);
  return oneOf(EnemyPilots);
}

export function generateEnemy(g: Engine, maxDifficulty: number) {
  while (true) {
    const prefab = oneOf(ShipPrefabs);
    const power = oneOf(ShipPowers);
    const pilot = getPilot(prefab, power);
    const difficulty =
      powerDifficulty[power] +
      prefabDifficulty[prefab] +
      (pilot?.difficulty ?? 0);

    if (difficulty <= maxDifficulty) {
      const entity = g.spawn(prefab);
      const { ship } = entity;

      if (!ship)
        throw new Error(`Ship prefab ${prefab} doesn't have a ship component!`);

      // TODO set hp, weapons, etc.
      if (isHealthy(power)) ship.maxHp = ship.maxHp * 2 + 3;

      if (pilot) putPilotInShip(entity, pilot);

      entity.setAI({ idealDistance: 6, speed: 1 });

      ship.hp = ship.maxHp;
      ship.shield = ship.maxShield;

      const appearance = Colours[power];
      for (const part of getEntityTree(g, entity)) {
        if (part.appearance) Object.assign(part.appearance, appearance);
      }

      return { entity, difficulty };
    }
  }
}

function isFree(g: Engine, sx: number, sy: number, w: number, h: number) {
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const { wall, solid, other } = g.getContents({ x: sx + x, y: sy + y });
      if (wall || solid || other.length) return false;
    }

  return true;
}

export function findSpawnPosition(
  g: Engine,
  width: number,
  height: number
): Position {
  for (let y = 0; y < 5; y++) {
    const xList = shuffle(enumerate(g.term.width - width));

    for (const x of xList) {
      if (isFree(g, x, y, width, height)) return { x, y };
    }
  }

  throw new Error(`Could not find spawn position for ${width}x${height}!`);
}
