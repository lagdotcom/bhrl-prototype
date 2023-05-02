import Engine from "@app/Engine";
import { getEntityMidpoint } from "@app/logic/entity";
import Query from "@app/Query";
import { angleBetween, angleDiff } from "@app/tools/angle";

export default function addHoming(g: Engine) {
  const query = new Query(g.entities, ["homing", "motion", "position"]);
  g.on("tick", function ApplyHoming() {
    query.forEach(({ homing, motion, position }, e) => {
      if (!homing.target?.alive) return;

      const centre = getEntityMidpoint(g, homing.target);
      const desired = angleBetween(position, centre);
      const diff = angleDiff(motion.angle, desired);

      if (Math.abs(diff) <= homing.strength) motion.angle = desired;
      else if (diff < 0) motion.angle -= homing.strength;
      else motion.angle += homing.strength;

      if (--homing.duration <= 0) {
        e.setHoming();
        e.setTrail();
      }
    });
  });
}
