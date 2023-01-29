import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Query from "@app/Query";
import angleMove from "@app/tools/angleMove";
import generateField from "@app/logic/generateField";
import getFieldAppearance from "@app/logic/getFieldAppearance";
import { intPosition } from "@app/tools/int";
import walkGrid from "@app/logic/walkGrid";

export default function addMotion(g: Engine) {
  const query = new Query(g.entities, ["motion", "position"]);
  g.on("tick", () =>
    query.forEach(({ motion, position, explodes, ignoreSolid }, e) => {
      const [dx, dy] = angleMove(motion);
      const dst = { x: position.x + dx, y: position.y + dy };

      const line = walkGrid(intPosition(position), intPosition(dst));

      let hitWall = false;
      let hitEntity: Entity | undefined = undefined;
      for (const pos of line) {
        g.move(e, pos);

        const { wall, solid } = g.getContents(pos);
        if (wall) {
          hitWall = true;
          break;
        } else if (solid && !ignoreSolid?.ids.includes(g.getRootID(solid))) {
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
