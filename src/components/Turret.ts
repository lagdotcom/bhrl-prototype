import Appearance from "./Appearance";
import { PrefabName } from "@app/prefabs";

type Turret = {
  name: string;
  bulletPrefab: PrefabName;
  bulletAngle: number | "lastMovement" | "nearestEnemy";
  bulletVelocity: number;
  beam?: { duration: number; appearance: Partial<Appearance>[] };
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
  ammunition: number;
};
export default Turret;
