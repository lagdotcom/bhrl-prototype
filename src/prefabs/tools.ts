import { PrefabChild } from "@app/types/Prefab";
import { PrefabName } from ".";
import { Ship } from "@app/components";

export const child = (
  name: PrefabName,
  x: number,
  y: number,
  overlay?: PrefabChild["overlay"],
  tags?: PrefabChild["tags"]
): PrefabChild => ({ name, x, y, overlay, tags });

export const ship = (name: string, maxHp: number, maxShield = 0): Ship => ({
  name,
  maxHp,
  hp: 0,
  maxShield,
  shield: 0,
});
