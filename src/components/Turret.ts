import Appearance from "./Appearance";
import Position from "./Position";
import { PrefabName } from "@app/prefabs";

export type TurretBullet = {
  type: "bullet";
  canDouble?: boolean;
  name: string;
  prefab: PrefabName;
  angle: number | "lastMovement" | "nearestEnemy" | "random";
  vel: number;
  offset?: Position;
  beam?: { duration: number; appearance: Partial<Appearance>[] };
  delay?: number;
  appearance?: Partial<Appearance>;
};

export type TurretArrayFire = {
  type: "array";
  canDouble: false;
  tag: string;
  offset?: Position;
  delay?: number;
};

export type TurretShot = TurretBullet | TurretArrayFire;

type Turret = {
  name: string;
  shots: TurretShot[];
  salvoCount: number;
  timeBetweenShots: number;
  timeBetweenSalvos: number;
  timer: number;
  salvo: number;
  ammunition: number;
};
export default Turret;
