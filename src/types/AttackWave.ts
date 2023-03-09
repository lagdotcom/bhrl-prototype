import { PrefabName } from "@app/prefabs";

type AttackWave = {
  name: string;
  difficulty: number;
  groups: { count: number; prefabs: PrefabName[] }[];
};
export default AttackWave;
