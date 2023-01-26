import { PrefabName } from "@app/prefabs";

type Turret = {
  bulletPrefab: PrefabName;
  bulletVelocity: number;
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  mode: string;
  timer: number;
  salvo: number;
};
export default Turret;
