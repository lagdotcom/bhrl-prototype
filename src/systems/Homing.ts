import Engine from "@app/Engine";
import System from "@app/System";
import angleDiff from "@app/tools/angleDiff";

export default function getHoming(g: Engine) {
  return new System(
    g,
    ["homing", "motion", "position"],
    ({ homing, motion, position }, e) => {
      const desired = Math.atan2(
        g.player.position!.y - position.y,
        g.player.position!.x - position.x
      );
      const diff = angleDiff(motion.angle, desired);

      if (Math.abs(diff) <= homing.strength) motion.angle = desired;
      else if (diff < 0) motion.angle -= homing.strength;
      else motion.angle += homing.strength;

      if (--homing.duration <= 0) {
        e.setHoming();
        e.setTrail();
      }
    }
  );
}
