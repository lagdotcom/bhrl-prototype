import Engine from "@app/Engine";
import Query from "@app/Query";
import isTurretFiring from "@app/logic/turret";

export default function addTurrets(g: Engine) {
  const query = new Query(g.entities, ["position", "turret"]);
  g.on("tick", () =>
    query.forEach(({ position, turret }, e) => {
      if (isTurretFiring(turret)) {
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
    })
  );
}
