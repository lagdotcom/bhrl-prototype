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

    const pilotAtIndex = Math.floor(Math.random() * prefabs.length);
    for (let i = 0; i < prefabs.length; i++) {
      const hasStarPilot = i === pilotAtIndex && pilot !== undefined;
      const prefab = prefabs[i];
      const power = getShipPower(specialChance, hasStarPilot);

      const e = makeEnemy(g, prefab, power);
      const position = findSpawnPosition(g, e);
      e.move(position.x, position.y);
    }
  });
}
