import { Pilot, Ship } from "@app/components";
import { getEntityLayout, getEntityTree, isSpaceFree } from "@app/logic/entity";

import AttackWave from "@app/types/AttackWave";
import EnemyFlags from "@app/types/EnemyFlags";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { PilotClasses } from "@app/types/PilotClass";
import { PowerAppearancePatch } from "@app/logic/colours";
import { PrefabName } from "@app/prefabs";
import ShipPower from "@app/types/ShipPower";
import { clone } from "@app/tools/object";
import enumerate from "@app/tools/enumerate";
import oneOf from "@app/tools/oneOf";
import { putPilotInShip } from "@app/logic/pilot";
import shuffle from "@app/tools/shuffle";
import without from "@app/tools/without";

export const PowerToFlags: Record<ShipPower, EnemyFlags> = {
  Typical: EnemyFlags.None,
  Healthy: EnemyFlags.Healthy,
  Double: EnemyFlags.Double,
  Multi: EnemyFlags.Healthy | EnemyFlags.Double,

  Drain: EnemyFlags.Drain,
  StarPilot: EnemyFlags.HasPilot,
  Mega:
    EnemyFlags.Healthy |
    EnemyFlags.Double |
    EnemyFlags.Drain |
    EnemyFlags.HasPilot,
};

const escorts: PrefabName[] = [
  "ShipA",
  "ShipB",
  "ShipC",
  "ShipD",
  "ShipE",
  "ShipF",
  "ShipG",
  "ShipH",
];

const battleships: PrefabName[] = [
  "CruiseyWing",
  "Olm",
  "GoutOFlame",
  "Demigod",
  "Gremlin",
  "AtomSmasher",
];

const waves: AttackWave[] = [
  {
    name: "Let Fate Decide",
    difficulty: 1,
    groups: [
      { count: 7, prefabs: escorts },
      { count: 1, prefabs: battleships },
    ],
  },
  {
    name: "Court Martial",
    difficulty: 2,
    groups: [
      { count: 5, prefabs: ["ShipA", "ShipE"] },
      { count: 1, prefabs: ["CruiseyWing"] },
    ],
  },
  {
    name: "Hellhounds",
    difficulty: 3,
    groups: [
      { count: 2, prefabs: ["ShipB"] },
      { count: 2, prefabs: ["GoutOFlame"] },
    ],
  },
  {
    name: "Chaos",
    difficulty: 4,
    groups: [
      { count: 4, prefabs: ["ShipC"] },
      {
        count: 4,
        prefabs: without(escorts, "ShipC"),
      },
      { count: 1, prefabs: ["Demigod"] },
    ],
  },
  {
    name: "Fly in Formation",
    difficulty: 4,
    groups: [
      { count: 7, prefabs: ["ShipF"] },
      { count: 1, prefabs: battleships },
    ],
  },
  {
    name: "Hark!",
    difficulty: 6,
    groups: [
      { count: 3, prefabs: ["ShipH"] },
      { count: 3, prefabs: without(escorts, "ShipH") },
      { count: 1, prefabs: ["Demigod"] },
    ],
  },
  {
    name: "Caverns.com",
    difficulty: 7,
    groups: [
      { count: 1, prefabs: ["ShipA", "ShipG"] },
      { count: 3, prefabs: ["Olm"] },
    ],
  },
  {
    name: "Humanity to the Rescue",
    difficulty: 8,
    groups: [
      { count: 7, prefabs: ["ShipA", "ShipD", "ShipE", "ShipG"] },
      { count: 1, prefabs: ["GoutOFlame"] },
    ],
  },
  {
    name: "Wild Hunt",
    difficulty: 9,
    groups: [
      { count: 15, prefabs: ["ShipB", "ShipF"] },
      { count: 1, prefabs: ["Olm"] },
    ],
  },
  {
    name: "Arm Wrestling",
    difficulty: 10,
    groups: [
      { count: 9, prefabs: ["ShipG"] },
      { count: 2, prefabs: ["CruiseyWing"] },
    ],
  },
  {
    name: "Valis",
    difficulty: 11,
    groups: [
      { count: 4, prefabs: ["ShipC"] },
      { count: 4, prefabs: ["ShipH"] },
      { count: 1, prefabs: battleships },
    ],
  },
];

export function getWaves(count = 3) {
  return shuffle(waves.slice())
    .slice(0, count)
    .sort((a, b) => a.difficulty - b.difficulty);
}

export function getShipPower(
  specialChance: number,
  starPilot: boolean
): ShipPower {
  if (Math.random() * 100 >= specialChance)
    return starPilot ? "StarPilot" : "Typical";

  if (starPilot) return "Mega";

  return oneOf(["Healthy", "Double", "Multi", "Drain"]);
}

export function makePilot(basePilot: Pilot) {
  const pilot = clone(basePilot);

  // give random classes up to Talent limit
  while (pilot.class.length < pilot.talent)
    pilot.class.push(
      oneOf(PilotClasses.filter((cl) => !pilot.class.includes(cl)))
    );

  return pilot;
}

export function makeEnemy(
  g: Engine,
  prefab: PrefabName,
  power: ShipPower,
  basePilot?: Pilot
) {
  const flags = PowerToFlags[power];
  if (flags & EnemyFlags.HasPilot && !basePilot)
    throw new Error(`power ${power} needs pilot, none given`);

  const e = g.spawn(prefab);
  const { ship } = e;
  if (!ship)
    throw new Error(`Ship prefab ${prefab} doesn't have a ship component!`);

  ship.power = power;
  if (flags & EnemyFlags.Healthy) ship.maxHp = ship.maxHp * 2 + 3;

  if (basePilot) {
    const pilot = makePilot(basePilot);
    putPilotInShip(g, e, pilot);
  }

  initialiseShip(ship);

  const appearance = PowerAppearancePatch[power];
  for (const part of getEntityTree(g, e)) {
    if (part.appearance) Object.assign(part.appearance, appearance);
  }

  return e;
}

export function findSpawnPosition(g: Engine, e: Entity) {
  const { width, height } = getEntityLayout(g, e);

  for (let y = 0; y < g.term.height; y++) {
    const xList = shuffle(enumerate(g.term.width - width));

    for (const x of xList) {
      if (isSpaceFree(g, x, y, width, height)) return { x, y };
    }
  }

  throw new Error(`Could not find ${width}x${height} spawn location`);
}

export function initialiseShip(ship: Ship) {
  ship.hp = ship.maxHp;
  ship.shield = ship.maxShield;
}
