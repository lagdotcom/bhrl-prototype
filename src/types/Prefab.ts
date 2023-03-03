import { ComponentMap } from "@app/components";
import { PrefabName } from "@app/prefabs";

export type PrefabChild = {
  name: PrefabName;
  x: number;
  y: number;
  overlay?: { [K in keyof ComponentMap]?: Partial<ComponentMap[K]> };
  tags?: string[];
};

type Prefab = {
  components?: Partial<ComponentMap>;
  children?: PrefabChild[];
};
export default Prefab;
