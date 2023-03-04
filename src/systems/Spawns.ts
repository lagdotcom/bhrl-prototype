import { findSpawnPosition, generateEnemy } from "@app/logic/enemy";

import Engine from "@app/Engine";
import { getEntityLayout } from "@app/logic/entity";

export default function addSpawns(g: Engine) {
  let time = 0;

  g.on("tick", () => {
    time++;

    if (!(time % 10)) {
      const maxDifficulty = Math.ceil(time / 20);
      const { entity } = generateEnemy(g, maxDifficulty);

      const { width, height } = getEntityLayout(g, entity);
      const position = findSpawnPosition(g, width, height);
      entity.move(position.x, position.y);
    }
  });
}
