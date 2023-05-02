import Engine from "@app/Engine";
import {
  getEntityMidpoint,
  getEntityTreeIDs,
  hasComponents,
} from "@app/logic/entity";
import { advanceTimer, canFire, fire } from "@app/logic/turret";
import Query from "@app/Query";
import distance from "@app/tools/distance";

export default function addTurrets(g: Engine) {
  const query = new Query(g.entities, ["position", "turret"]);
  g.on("tick", function FireTurrets() {
    query.forEach(({ position, turret }, e) => {
      advanceTimer(turret);

      const root = g.getRoot(e);
      if (!hasComponents(root, ["ai", "ship"])) return;

      const enemy = root.ai.attacking;
      if (!enemy?.alive) return;

      const target = getEntityMidpoint(g, enemy);
      if (distance(position, target) > (root.ai.firingDistance ?? Infinity))
        return;

      if (canFire(turret)) {
        for (const bullet of fire(
          g,
          turret,
          position,
          target,
          root,
          getEntityTreeIDs(g, root)
        )) {
          if (bullet.homing) bullet.homing.target = enemy;

          if (bullet.ai) bullet.ai.attacking = enemy;
        }
      }
    });
  });
}
