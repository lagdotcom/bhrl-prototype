import Engine from "@app/Engine";
import System from "@app/System";
import turretReducer from "@app/logic/turretReducer";

export default function getTurrets(g: Engine) {
  return new System(g, ["position", "turret"], ({ position, turret }, e) => {
    turretReducer(turret);
    if (turret.mode === "fire") {
      g.spawn(turret.bulletPrefab)
        .setIgnoreSolid({ ids: [g.getRootID(e)] })
        .setPosition({ x: position.x + 0.5, y: position.y + 0.5 })
        .setMotion({
          angle: Math.atan2(
            g.player.position!.y - position.y,
            g.player.position!.x - position.x
          ),
          vel: turret.bulletVelocity,
        });
    }
  });
}
