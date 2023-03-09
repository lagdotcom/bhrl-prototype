import { getEntityMidpoint, getEntityTree } from "@app/logic/entity";

import Engine from "@app/Engine";
import Query from "@app/Query";
import { fireBullet } from "@app/logic/turret";

export default function addDelayedShots(g: Engine) {
  const query = new Query(g.entities, ["ai", "delayedShot"]);
  g.on("tick", function FireDelayedShots() {
    query.forEach(({ ai, delayedShot }, e) => {
      for (let i = delayedShot.shots.length - 1; i >= 0; i--) {
        const { turret, bullet } = delayedShot.shots[i];
        if (--bullet.delay! <= 0) {
          bullet.delay = 0;
          delayedShot.shots.splice(i, 1);

          const tree = getEntityTree(g, e);
          const turretEntity = tree.find((te) => te.turret === turret);
          if (!turretEntity) continue;

          if (!ai.attacking) continue;
          const target = getEntityMidpoint(g, ai.attacking);

          fireBullet(
            g,
            bullet,
            turret,
            turretEntity.position!,
            target,
            e,
            tree.map((te) => te.id)
          );
        }
      }

      if (!delayedShot.shots.length) e.setDelayedShot();
    });
  });
}
