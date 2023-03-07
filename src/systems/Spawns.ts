import { findSpawnPosition, getShipPower, makeEnemy } from "@app/logic/enemy";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import oneOf from "@app/tools/oneOf";

export default function addSpawns(g: Engine) {
  g.on("waveBegin", function SpawnNextWave({ wave, difficulty, pilot }) {
    const entities: Entity[] = [];

    const specialChance = (difficulty + wave.difficulty) * 3;

    for (let i = 0; i < wave.escorts; i++) {
      const power = getShipPower(specialChance, false);
      const prefab = oneOf(wave.escortTypes);
      entities.push(makeEnemy(g, prefab, power));
    }

    const pilotAtIndex = Math.floor(Math.random() * wave.flagships);
    for (let i = 0; i < wave.flagships; i++) {
      const hasStarPilot = i === pilotAtIndex && pilot !== undefined;
      const power = getShipPower(specialChance, hasStarPilot);
      const prefab = oneOf(wave.flagshipTypes);
      entities.push(makeEnemy(g, prefab, power));
    }

    for (const e of entities) {
      const position = findSpawnPosition(g, e);
      e.move(position.x, position.y);
    }
  });
}
