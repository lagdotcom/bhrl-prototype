import {
  Appearance,
  LastMovement,
  Position,
  Ship,
  Turret,
} from "@app/components";
import { TurretAngle, TurretShot } from "@app/components/Turret";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Angles from "@app/logic/angles";
import { initialiseShip } from "@app/logic/enemy";
import {
  entityHasComponents,
  EntityWithComponents,
  getEntityMidpoint,
  getEntityTree,
} from "@app/logic/entity";
import { getScaledValue } from "@app/logic/pilot";
import { PrefabName } from "@app/prefabs";
import { angleBetween, angleMove, angleWrap } from "@app/tools/angle";
import distance from "@app/tools/distance";
import enumerate from "@app/tools/enumerate";
import { clone } from "@app/tools/object";
import oneOf from "@app/tools/oneOf";
import { addPositions, pos } from "@app/tools/position";
import Angle from "@app/types/Angle";
import { Colors } from "wglt";

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
    bullet.projectile.damage = getScaledValue(bullet.projectile.scaling, owner);

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
  owner: EntityWithComponents<["ship"]>,
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
    for (const tagged of getEntityTree(g, owner)
      .filter((e) => e.tags.has(shot.tag))
      .filter(entityHasComponents(["position", "turret"])))
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

    return bullets;
  }

  const { angle: angleCmd, beam, name, offset, prefab, vel } = shot;

  const start = addPositions(position, offset ?? pos(0, 0));
  const angle = getTurretAngle(
    start,
    target,
    angleCmd,
    owner.ship,
    owner.lastMovement
  );

  if (beam && vel) {
    const [dx, dy] = angleMove({ angle, vel });
    const step = pos(dx, dy);
    let position = addPositions(start, step);

    const length = getScaledValue(beam.length, owner);
    const getPatch = (n: number) =>
      beam.appearance[Math.max(0, beam.appearance.length - length + n)];

    return enumerate(length, 0).map((n) => {
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

      const patch = getPatch(n);
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
  owner: EntityWithComponents<["ship"]>,
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
