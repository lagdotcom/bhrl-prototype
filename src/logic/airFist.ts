import Engine from "@app/Engine";
import { Position } from "@app/components";
import { angleBetween } from "@app/tools/angle";
import distance from "@app/tools/distance";
import { getCirclePoints } from "@app/logic/geometry";

export function fireAirFist(g: Engine, centre: Position, power: number) {
  for (const e of g.entities.get()) {
    const { motion, projectile, position } = e;
    if (
      motion &&
      projectile &&
      position &&
      distance(centre, position) <= power
    ) {
      const angle = angleBetween(centre, position);
      motion.angle = angle;

      e.setIgnoreSolid();
    }
  }

  for (const point of getCirclePoints(centre.x, centre.y, power)) {
    g.spawn("AirFistRange").setPosition(point);
  }
}
