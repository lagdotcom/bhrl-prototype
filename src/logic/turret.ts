import { Position, Turret } from "@app/components";
import { angleBetween, angleMove } from "@app/tools/angle";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { PrefabName } from "@app/prefabs";
import { TurretBullet } from "@app/components/Turret";
import { addPositions } from "@app/tools/position";
import { initialiseShip } from "@app/logic/enemy";

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
  if (
    turret.bullets.find((b) => b.angle === "lastMovement") &&
    !owner.lastMovement
  )
    return false;
  return turret.timer === 0;
}

function initBullet(
  g: Engine,
  prefab: PrefabName,
  owner: Entity,
  turret: Turret,
  start: Position,
  angle: number,
  vel: number,
  ignoreIds: number[]
) {
  const bullet = g
    .spawn(prefab)
    .setIgnoreSolid({ ids: ignoreIds })
    .move(start.x, start.y);

  if (vel) bullet.setMotion({ angle, vel });

  if (bullet.ship) initialiseShip(bullet.ship);

  if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

  return bullet;
}

function fireBullet(
  g: Engine,
  b: TurretBullet,
  turret: Turret,
  position: Position,
  target: Position,
  owner: Entity,
  ignoreIds: number[]
) {
  const { angle: angleCmd, beam, offset, prefab, vel } = b;

  const start = addPositions(position, offset ?? { x: 0.5, y: 0.5 });
  const angle =
    angleCmd === "nearestEnemy"
      ? angleBetween(start, target)
      : angleCmd === "lastMovement"
      ? owner.lastMovement!.angle
      : angleCmd;

  if (beam && vel) {
    const [dx, dy] = angleMove({ angle, vel });
    const step = { x: dx, y: dy };
    let position = addPositions(start, step);

    return beam.appearance.map((patch) => {
      const bullet = initBullet(
        g,
        prefab,
        owner,
        turret,
        position,
        angle,
        0,
        ignoreIds
      ).setLifetime({ duration: beam.duration });
      if (bullet.appearance) Object.assign(bullet.appearance, patch);
      if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

      position = addPositions(position, step);

      return bullet;
    });
  }

  return [initBullet(g, prefab, owner, turret, start, angle, vel, ignoreIds)];
}

export function fire(
  g: Engine,
  turret: Turret,
  position: Position,
  target: Position,
  owner: Entity,
  ignoreIds: number[] = []
) {
  const { timeBetweenSalvos, timeBetweenShots } = turret;

  if (--turret.salvo <= 0) turret.timer = timeBetweenSalvos;
  else turret.timer = timeBetweenShots;

  const bullets: Entity[] = [];

  for (const bullet of turret.bullets)
    bullets.push(
      ...fireBullet(g, bullet, turret, position, target, owner, ignoreIds)
    );

  return bullets;
}
