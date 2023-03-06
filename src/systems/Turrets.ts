import { advanceTimer, canFire, fire } from "@app/logic/turret";
import { getEntityMidpoint, getEntityTreeIDs } from "@app/logic/entity";

import Engine from "@app/Engine";
import Query from "@app/Query";
import distance from "@app/tools/distance";

export default function addTurrets(g: Engine) {
  const query = new Query(g.entities, ["position", "turret"]);
  g.on("tick", () =>
    query.forEach(({ position, turret }, e) => {
      advanceTimer(turret);

      const root = g.getRoot(e);
      if (!root.ai) return;

      const enemy = root.ai.attacking;
      if (!enemy?.alive) return;

      const target = getEntityMidpoint(g, enemy);
      if (distance(position, target) > (root.ai.firingDistance ?? Infinity))
        return;

      if (canFire(turret)) {
        const bullet = fire(
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
