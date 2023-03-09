import { PrefabName } from "@app/prefabs";
import { Ship } from "@app/components";

type AttackWave = {
  name: string;
  difficulty: number;
  groups: { count: number; type: Ship["type"]; prefabs: PrefabName[] }[];
};
export default AttackWave;
