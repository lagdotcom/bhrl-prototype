import { PrefabName } from "@app/prefabs";

type Turret = {
  bulletPrefab: PrefabName;
  bulletVelocity: number;
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
};
export default Turret;
