import { findSpawnPosition, getShipPower, makeEnemy } from "@app/logic/enemy";

import Engine from "@app/Engine";
import { PrefabName } from "@app/prefabs";
import oneOf from "@app/tools/oneOf";

export default function addSpawns(g: Engine) {
  g.on("waveBegin", function SpawnNextWave({ wave, difficulty, pilot }) {
    const specialChance = (difficulty + wave.difficulty) * 3;

    const prefabs: PrefabName[] = [];
    for (const group of wave.groups)
      for (let i = 0; i < group.count; i++) prefabs.push(oneOf(group.prefabs));

    // +1 escort per cleared sector
    const escortGroups = wave.groups.filter((g) => g.type === "Escort");
    for (let i = 0; i < difficulty; i++) {
      const group = oneOf(escortGroups);
      prefabs.push(oneOf(group.prefabs));
    }

    const pilotAtIndex = Math.floor(Math.random() * prefabs.length);
    for (let i = 0; i < prefabs.length; i++) {
      const hasStarPilot = i === pilotAtIndex && pilot !== undefined;
      const prefab = prefabs[i];
      const power = getShipPower(specialChance, hasStarPilot);

      const e = makeEnemy(g, prefab, power, hasStarPilot ? pilot : undefined);
      const position = findSpawnPosition(g, e);
      e.move(position.x, position.y);
    }
  });

  let nextWaveTimer = Infinity;
  g.on("kill", ({ e }) => {
    if (!e.ship) return;

    const enemies = g.entities
      .get()
      .filter((x) => x.alive && x.ship && x.ship.type !== "Player");

    if (!enemies.length) nextWaveTimer = 5;
  });

  g.on("tick", () => {
    if (--nextWaveTimer <= 0) {
      nextWaveTimer = Infinity;
      g.fire("waveNext", undefined);
    }
  });
}
