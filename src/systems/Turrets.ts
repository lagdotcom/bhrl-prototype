import { getEntityMidpoint, getEntityTreeIDs } from "@app/logic/entity";

import Engine from "@app/Engine";
import Query from "@app/Query";
import { angleBetween } from "@app/tools/angle";
import isTurretFiring from "@app/logic/turret";

export default function addTurrets(g: Engine) {
  const query = new Query(g.entities, ["position", "turret"]);
  g.on("tick", () =>
    query.forEach(({ position, turret }, e) => {
      if (isTurretFiring(turret)) {
        const start = { x: position.x + 0.5, y: position.y + 0.5 };
        const target = getEntityMidpoint(g, g.player);

        g.spawn(turret.bulletPrefab)
          .setIgnoreSolid({ ids: getEntityTreeIDs(g, e) })
          .setPosition(start)
          .setMotion({
            angle: angleBetween(start, target),
            vel: turret.bulletVelocity,
          });
      }
    })
  );
}
