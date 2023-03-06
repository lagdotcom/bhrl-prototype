import { PrefabName } from "@app/prefabs";

type Turret = {
  name: string;
  bulletPrefab: PrefabName;
  bulletAngle: number | "nearestEnemy";
  bulletVelocity: number;
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
  ammunition: number;
};
export default Turret;
