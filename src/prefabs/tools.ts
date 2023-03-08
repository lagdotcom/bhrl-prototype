import { Ship, Turret } from "@app/components";

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
});

export const turret = (
  name: string,
  {
    salvoCount = 1,
    timeBetweenShots = 1,
    timeBetweenSalvos = 1,
    ammunition = Infinity,
  }: Partial<Turret>,
  bullets: Turret["bullets"]
): Turret => ({
  name,
  bullets,
  salvoCount,
  timeBetweenShots,
  timeBetweenSalvos,
  timer: 0,
  salvo: salvoCount,
  ammunition,
});
