import Appearance from "./Appearance";
import Position from "./Position";
import { PrefabName } from "@app/prefabs";

export type TurretBullet = {
  name: string;
  prefab: PrefabName;
  angle: number | "lastMovement" | "nearestEnemy";
  vel: number;
  offset?: Position;
  beam?: { duration: number; appearance: Partial<Appearance>[] };
  delay?: number;
};

type Turret = {
  name: string;
  bullets: TurretBullet[];
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
  ammunition: number;
};
export default Turret;
