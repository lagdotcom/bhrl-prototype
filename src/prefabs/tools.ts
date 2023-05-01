import { Ship, Turret } from "@app/components";
import {
  TurretAngle,
  TurretArrayFire,
  TurretBullet,
  TurretShot,
} from "@app/components/Turret";

import { PrefabChild } from "@app/types/Prefab";
import { PrefabName } from ".";
import Angles from "@app/logic/angles";

export const child = (
  name: PrefabName,
  x: number,
  y: number,
  overlay?: PrefabChild["overlay"],
  tags?: PrefabChild["tags"]
): PrefabChild => ({ name, x, y, overlay, tags });

export const ship = (
  name: string,
  type: Ship["type"],
  maxHp: number,
  maxShield = 0
): Ship => ({
  name,
  type,
  maxHp,
  hp: 0,
  maxShield,
  shield: 0,
  shieldTimer: 0,
  firingDirection: type === "Player" ? Angles.Up : Angles.Down,
});

export const turret = (
  name: string,
  {
    salvoCount = 1,
    timeBetweenShots = 1,
    timeBetweenSalvos = 1,
    ammunition = Infinity,
  }: Partial<Turret>,
  shots: TurretShot[]
): Turret => ({
  name,
  shots,
  salvoCount,
  timeBetweenShots,
  timeBetweenSalvos,
  timer: 0,
  salvo: salvoCount,
  ammunition,
});

const RelativeDirs = ["F", "FR", "R", "BR", "B", "BL", "L", "FL"] as const;
type RelativeDir = (typeof RelativeDirs)[number];

export const rel = (name: RelativeDir): TurretAngle => ({
  type: "relative",
  rel: (RelativeDirs.indexOf(name) * Math.PI) / 4,
});
export const aim: TurretAngle = { type: "nearestEnemy" };
export const rnd: TurretAngle = { type: "random" };

export const bullet = (
  name: string,
  prefab: PrefabName,
  angle: TurretAngle,
  vel: number,
  { canDouble, delay, offset, beam }: Partial<TurretBullet> = {}
): TurretBullet => ({
  type: "bullet",
  canDouble,
  name,
  prefab,
  angle,
  vel,
  delay,
  offset,
  beam,
});

export const array = (
  tag: string,
  { delay, offset }: Partial<TurretArrayFire> = {}
): TurretArrayFire => ({ type: "array", canDouble: false, tag, delay, offset });
