import { PrefabName } from "@app/prefabs";

type Turret = {
  name: string;
  bulletPrefab: PrefabName;
  bulletAngle: number | "lastMovement" | "nearestEnemy";
  bulletVelocity: number;
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
  ammunition: number;
};
export default Turret;
