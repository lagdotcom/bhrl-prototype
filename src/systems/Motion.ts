import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Query from "@app/Query";
import { angleMove } from "@app/tools/angle";
import { intPosition } from "@app/tools/position";
import { walkGrid } from "@app/logic/geometry";

export default function addMotion(g: Engine) {
  const query = new Query(g.entities, ["motion", "position"]);
  g.on("tick", () =>
    query.forEach(({ motion, position, ignoreSolid }, e) => {
      const [dx, dy] = angleMove(motion);
      const dst = { x: position.x + dx, y: position.y + dy };

      const line = walkGrid(intPosition(position), intPosition(dst));

      let hitWall = false;
      let hitEntity: Entity | undefined = undefined;
      for (const pos of line) {
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
        g.delete(e);
      } else if (hitEntity) {
        // TODO damage etc.
        g.delete(e);
      } else {
        g.move(e, dst);
      }
    })
  );
}
