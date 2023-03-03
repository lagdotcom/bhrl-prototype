import { Position, Turret } from "@app/components";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { angleBetween } from "@app/tools/angle";

export function advanceTimer(turret: Turret) {
  if (turret.timer > 0) {
    turret.timer--;
    if (turret.timer <= 0 && turret.salvo <= 0)
      turret.salvo = turret.salvoCount;
    return;
  }
}

export function canFire(turret: Turret) {
  return turret.timer === 0;
}

export function fireAt(
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

  const bullet = g
    .spawn(turret.bulletPrefab)
    .setOwner(owner)
    .setIgnoreSolid({ ids: ignoreIds });

  bullet.move(start.x, start.y);
  if (turret.bulletVelocity)
    bullet.setMotion({
      angle: angleBetween(start, target),
      vel: turret.bulletVelocity,
    });

  return bullet;
}
