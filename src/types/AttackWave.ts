import { Ship } from "@app/components";
import { PrefabName } from "@app/prefabs";

type AttackWave = {
  name: string;
  difficulty: number;
  groups: { count: number; type: Ship["type"]; prefabs: PrefabName[] }[];
};
export default AttackWave;
