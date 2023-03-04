import { Position, Turret } from "@app/components";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { angleBetween } from "@app/tools/angle";

export function getState(turret: Turret) {
  if (turret.salvo <= 0) return "Reloading";
  if (turret.timer > 0) return "Chambering";
  return "Ready";
}

export function advanceTimer(turret: Turret) {
  if (turret.timer > 0) {
    turret.timer--;
    if (turret.timer <= 0 && turret.salvo <= 0)
      turret.salvo = turret.salvoCount;
  }
}

export function canFire(turret: Turret) {
  return turret.timer === 0;
}

export function fire(
  g: Engine,
  turret: Turret,
  position: Position,
  target: Position,
  owner: Entity,
  ignoreIds: number[] = []
) {
  if (--turret.salvo <= 0) turret.timer = turret.timeBetweenSalvos;
  else turret.timer = turret.timeBetweenShots;

  const start = { x: position.x + 0.5, y: position.y + 0.5 };
  const angle =
    turret.bulletAngle === "nearestEnemy"
      ? angleBetween(start, target)
      : turret.bulletAngle;

  const bullet = g
    .spawn(turret.bulletPrefab)
    .setIgnoreSolid({ ids: ignoreIds })
    .move(start.x, start.y);

  if (turret.bulletVelocity)
    bullet.setMotion({ angle, vel: turret.bulletVelocity });

  if (!bullet.ai) bullet.setOwner(owner);

  return bullet;
}
