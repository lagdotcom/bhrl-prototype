import { advanceTimer, canFire, fireAt } from "@app/logic/turret";
import { getEntityMidpoint, getEntityTreeIDs } from "@app/logic/entity";

import Engine from "@app/Engine";
import Query from "@app/Query";

export default function addTurrets(g: Engine) {
  const query = new Query(g.entities, ["position", "turret"]);
  g.on("tick", () =>
    query.forEach(({ position, turret }, e) => {
      const root = g.getRoot(e);
      const enemy = root.ai?.attacking;
      advanceTimer(turret);

      if (!enemy?.alive) return;

      if (canFire(turret) && enemy) {
        const target = getEntityMidpoint(g, enemy);
        const bullet = fireAt(
          g,
          turret,
          position,
          target,
          root,
          getEntityTreeIDs(g, e)
        );

        if (bullet.homing) bullet.homing.target = enemy;

        if (bullet.ai) bullet.ai.attacking = enemy;
      }
    })
  );
}
