import { Position, Turret } from "@app/components";
import { angleBetween, angleMove } from "@app/tools/angle";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { addPositions } from "@app/tools/position";

export function getState(turret: Turret) {
  if (turret.salvo <= 0) {
    if (turret.ammunition <= 0) return "Spent";
    return "Reloading";
  }
  if (turret.timer > 0) return "Chambering";
  return "Ready";
}

export function advanceTimer(turret: Turret) {
  if (turret.timer > 0) {
    turret.timer--;
    if (turret.timer <= 0 && turret.salvo <= 0) {
      if (turret.ammunition) {
        turret.salvo = Math.min(turret.salvoCount, turret.ammunition);
        turret.ammunition -= turret.salvo;
      } else turret.timer = Infinity;
    }
  }
}

export function canFire(turret: Turret, owner: Entity) {
  if (turret.bulletAngle === "lastMovement" && !owner.lastMovement)
    return false;
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
  const {
    beam,
    bulletAngle,
    bulletPrefab,
    bulletVelocity,
    timeBetweenSalvos,
    timeBetweenShots,
  } = turret;

  if (--turret.salvo <= 0) turret.timer = timeBetweenSalvos;
  else turret.timer = timeBetweenShots;

  const start = { x: position.x + 0.5, y: position.y + 0.5 };
  const angle =
    bulletAngle === "nearestEnemy"
      ? angleBetween(start, target)
      : bulletAngle === "lastMovement"
      ? owner.lastMovement!.angle
      : bulletAngle;

  if (beam && bulletVelocity) {
    const [dx, dy] = angleMove({ angle, vel: bulletVelocity });
    const step = { x: dx, y: dy };
    let position = addPositions(start, step);

    return beam.appearance.map((patch) => {
      const bullet = g
        .spawn(bulletPrefab)
        .setIgnoreSolid({ ids: ignoreIds })
        .setLifetime({ duration: beam.duration })
        .move(position.x, position.y)
        .setMotion({ angle, vel: 0 });
      if (bullet.appearance) Object.assign(bullet.appearance, patch);
      if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

      position = addPositions(position, step);

      return bullet;
    });
  }

  const bullet = g
    .spawn(bulletPrefab)
    .setIgnoreSolid({ ids: ignoreIds })
    .move(start.x, start.y);

  if (bulletVelocity) bullet.setMotion({ angle, vel: bulletVelocity });

  if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

  return [bullet];
}
