import { PrefabChild } from "@app/types/Prefab";
import { PrefabName } from ".";

export const child = (
  name: PrefabName,
  x: number,
  y: number,
  overlay?: PrefabChild["overlay"],
  tags?: PrefabChild["tags"]
): PrefabChild => ({ name, x, y, overlay, tags });
