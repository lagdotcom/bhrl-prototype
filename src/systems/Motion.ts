import { intPosition, pos } from "@app/tools/position";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Query from "@app/Query";
import { angleMove } from "@app/tools/angle";
import damage from "@app/logic/damage";
import { walkGrid } from "@app/logic/geometry";

export default function addMotion(g: Engine) {
  const query = new Query(g.entities, ["motion", "position"]);
  g.on("tick", function MoveProjectiles() {
    query.forEach(({ motion, position, projectile, ignoreSolid }, e) => {
      const [dx, dy] = angleMove(motion);
      const dst = pos(position.x + dx, position.y + dy);

      const line = walkGrid(intPosition(position), intPosition(dst));

      let hitWall = false;
      let hitEntity: Entity | undefined = undefined;
      for (const pos of line) {
        if (!g.inBounds(pos)) {
          g.kill(e, { type: "exitedMap" });
          return;
        }

        g.move(e, pos);

        const { wall, solid } = g.getContents(pos, ignoreSolid?.ids);
        if (wall) {
          hitWall = true;
          break;
        } else if (solid) {
          hitEntity = solid;
          break;
        }
      }

      if (hitWall) {
        g.kill(e, { type: "hitWall" });
      } else if (hitEntity) {
        if (projectile) damage(g, hitEntity, projectile.damage, e);
        // TODO item
        g.kill(e, { type: "hitEntity", other: hitEntity });
      } else {
        g.move(e, dst);
      }
    });
  });
}
