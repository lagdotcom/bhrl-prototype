import { Ship, Turret } from "@app/components";
import {
  TurretArrayFire,
  TurretBullet,
  TurretShot,
} from "@app/components/Turret";

import { PrefabChild } from "@app/types/Prefab";
import { PrefabName } from ".";

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

export const bullet = (
  name: string,
  prefab: PrefabName,
  angle: TurretBullet["angle"],
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
