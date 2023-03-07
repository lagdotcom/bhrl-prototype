import { PrefabName } from "@app/prefabs";

type AttackWave = {
  difficulty: number;
  escorts: number;
  escortTypes: PrefabName[];
  flagships: number;
  flagshipTypes: PrefabName[];
};
export default AttackWave;
