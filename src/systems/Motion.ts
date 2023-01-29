import Engine from "@app/Engine";
import Entity from "@app/Entity";
import System from "@app/System";
import angleMove from "@app/tools/angleMove";
import generateField from "@app/logic/generateField";
import getFieldAppearance from "@app/logic/getFieldAppearance";
import { intPosition } from "@app/tools/int";
import walkGrid from "@app/logic/walkGrid";

export default function getMotion(g: Engine) {
  return new System(
    g,
    ["motion", "position"],
    ({ motion, position, explodes, ignoreSolid, trail }, e) => {
      const [dx, dy] = angleMove(motion);
      const dst = { x: position.x + dx, y: position.y + dy };

      const line = walkGrid(intPosition(position), intPosition(dst));

      let reached = position;
      let hitWall = false;
      let hitEntity: Entity | undefined = undefined;
      for (let i = 0; i < line.length; i++) {
        reached = line[i];

        const { wall, solid } = g.getContents(reached);
        if (wall) {
          hitWall = true;
          break;
        } else if (solid && !ignoreSolid?.ids.includes(g.getRootID(solid))) {
          hitEntity = solid;
          break;
        }

        if (trail && i === line.length - 1)
          g.spawn(trail.effectPrefab).setPosition(reached);
      }

      if (hitWall) {
        e.kill();
      } else if (hitEntity) {
        // TODO damage etc.
        e.kill();
      } else {
        e.move(dst.x, dst.y);
      }

      if (!e.alive) {
        if (explodes) {
          for (const { x, y, intensity } of generateField(
            reached,
            explodes.size
          )) {
            const explosion = new Entity(g, e.name + "Explosion")
              .setPosition({ x, y })
              .setField({
                type: "fire",
                intensity,
                falloff: explodes.falloff,
              });

            explosion.setAppearance(getFieldAppearance(explosion.field!));
          }
        }
      }
    }
  );
}
