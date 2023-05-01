import {
  Appearance,
  LastMovement,
  Position,
  Ship,
  Turret,
} from "@app/components";
import { addPositions, pos } from "@app/tools/position";
import { angleBetween, angleMove, angleWrap } from "@app/tools/angle";
import { getEntityMidpoint, getEntityTree } from "@app/logic/entity";

import Angles from "./angles";
import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { EntityWithComponents } from "@app/Query";
import { PrefabName } from "@app/prefabs";
import { TurretAngle, TurretShot } from "@app/components/Turret";
import { clone } from "@app/tools/object";
import distance from "@app/tools/distance";
import { getStat } from "@app/logic/pilot";
import { initialiseShip } from "@app/logic/enemy";
import oneOf from "@app/tools/oneOf";
import Angle from "@app/types/Angle";

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

export function canFire(turret: Turret) {
  return turret.timer === 0;
}

export function addDelayedShot(
  e: Entity,
  shot: { turret: Turret; shot: TurretShot }
) {
  const delayed = e.delayedShot ?? { shots: [] };
  delayed.shots.push(shot);
  e.setDelayedShot(delayed);
}

function initBullet(
  g: Engine,
  name: string,
  prefab: PrefabName,
  owner: Entity,
  turret: Turret,
  start: Position,
  angle: Angle,
  vel: number,
  ignoreIds: number[],
  appearance?: Partial<Appearance>
) {
  const bullet = g
    .spawn(prefab)
    .setIgnoreSolid({ ids: ignoreIds })
    .move(start.x, start.y);
  bullet.name = name;

  if (vel) bullet.setMotion({ angle, vel });

  if (bullet.ship) initialiseShip(bullet.ship);

  if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

  if (bullet.projectile?.scaling)
    bullet.projectile.damage += Math.floor(
      getStat(owner, bullet.projectile.scaling.stat) *
        bullet.projectile.scaling.multiplier
    );

  if (bullet.appearance && appearance)
    Object.assign(bullet.appearance, appearance);

  return bullet;
}

function getTurretAngle(
  start: Position,
  target: Position,
  cmd: TurretAngle,
  ship: Ship,
  last?: LastMovement
): Angle {
  switch (cmd.type) {
    case "lastMovement":
      return last?.angle ?? ship.firingDirection;

    case "nearestEnemy":
      return angleBetween(start, target);

    case "random":
      return oneOf([
        Angles.Right,
        Angles.DownRight,
        Angles.Down,
        Angles.DownLeft,
        Angles.Left,
        Angles.UpLeft,
        Angles.Up,
        Angles.UpRight,
      ]);

    case "relative":
      return angleWrap(ship.firingDirection + cmd.rel);
  }
}

export function fireBullet(
  g: Engine,
  shot: TurretShot,
  turret: Turret,
  position: Position,
  target: Position,
  owner: Entity,
  ignoreIds: number[]
) {
  if (owner.doubleShot && shot.canDouble) {
    const doubled = clone(shot);
    doubled.canDouble = false;
    doubled.delay = owner.player ? 2 : 1; // this is due to the turn order...
    doubled.appearance = { fg: Colors.LIGHT_GRAY };
    addDelayedShot(owner, { turret, shot: doubled });
  }

  if (shot.delay) {
    const cloned = clone(shot);
    if (owner.player) cloned.delay!++; // this is due to the turn order...
    addDelayedShot(owner, { turret, shot: cloned });
    return [];
  }

  if (shot.type === "array") {
    const bullets: Entity[] = [];
    for (const tagged of getEntityTree(g, owner).filter((e) =>
      e.tags.has(shot.tag)
    )) {
      if (tagged.position && tagged.turret)
        bullets.push(
          ...fire(
            g,
            tagged.turret,
            addPositions(tagged.position, shot.offset ?? pos(0, 0)),
            target,
            owner,
            ignoreIds
          )
        );
    }

    return bullets;
  }

  const { angle: angleCmd, beam, name, offset, prefab, vel } = shot;

  const start = addPositions(position, offset ?? pos(0, 0));
  const angle = getTurretAngle(
    start,
    target,
    angleCmd,
    owner.ship!,
    owner.lastMovement
  );

  if (beam && vel) {
    const [dx, dy] = angleMove({ angle, vel });
    const step = pos(dx, dy);
    let position = addPositions(start, step);

    return beam.appearance.map((patch) => {
      const bullet = initBullet(
        g,
        name,
        prefab,
        owner,
        turret,
        position,
        angle,
        0,
        ignoreIds,
        shot.appearance
      )
        .setMotion({ angle, vel: 0 })
        .setLifetime({ duration: beam.duration });
      if (bullet.appearance && patch) Object.assign(bullet.appearance, patch);
      if (owner.ship) bullet.setOrigin({ owner, ship: owner.ship, turret });

      if (!g.inBounds(position)) bullet.kill({ type: "exitedMap" });
      position = addPositions(position, step);

      return bullet;
    });
  }

  return [
    initBullet(
      g,
      name,
      prefab,
      owner,
      turret,
      start,
      angle,
      vel,
      ignoreIds,
      shot.appearance
    ),
  ];
}

export function fire(
  g: Engine,
  turret: Turret,
  position: Position,
  target: Position,
  owner: Entity,
  ignoreIds: number[]
) {
  const { timeBetweenSalvos, timeBetweenShots } = turret;

  if (--turret.salvo <= 0) turret.timer = timeBetweenSalvos;
  else turret.timer = timeBetweenShots;

  const bullets: Entity[] = [];

  for (const shot of turret.shots)
    bullets.push(
      ...fireBullet(g, shot, turret, position, target, owner, ignoreIds)
    );

  return bullets;
}

function isPlayer(ship?: Ship) {
  return ship?.type === "Player";
}

export function getNearestEnemy(g: Engine, e: EntityWithComponents<["ship"]>) {
  const player = isPlayer(e.ship);
  const middle = getEntityMidpoint(g, e);
  const ships = g.entities
    .get()
    .filter((x) => x.ship && isPlayer(x.ship) !== player);

  if (!ships.length) return;
  let best = Infinity;
  let enemy: Entity | undefined = undefined;
  for (const ship of ships) {
    const pos = getEntityMidpoint(g, ship);
    const d = distance(middle, pos);
    if (d < best) {
      best = d;
      enemy = ship;
    }
  }

  return enemy;
}
