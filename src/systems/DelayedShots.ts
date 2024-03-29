import Engine from "@app/Engine";
import { getEntityMidpoint, getEntityTree } from "@app/logic/entity";
import { fireBullet } from "@app/logic/turret";
import Query from "@app/Query";
import { pos } from "@app/tools/position";

export default function addDelayedShots(g: Engine) {
  const query = new Query(g.entities, ["delayedShot", "ship"]);
  g.on("tick", function FireDelayedShots() {
    query.forEach(({ ai, delayedShot }, e) => {
      if (!e.alive) {
        e.setDelayedShot();
        return;
      }

      for (let i = delayedShot.shots.length - 1; i >= 0; i--) {
        const { turret, shot } = delayedShot.shots[i];
        if (--shot.delay! <= 0) {
          shot.delay = 0;
          delayedShot.shots.splice(i, 1);

          const tree = getEntityTree(g, e);
          const turretEntity = tree.find((te) => te.turret === turret);

          // this happens with smart bombs
          const position = turretEntity?.position ?? getEntityMidpoint(g, e);

          const target = ai?.attacking?.alive
            ? getEntityMidpoint(g, ai.attacking)
            : pos(0, 0);

          fireBullet(
            g,
            shot,
            turret,
            position,
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
