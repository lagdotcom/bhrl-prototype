import Appearance from "@app/components/Appearance";
import Position from "@app/components/Position";
import { PrefabName } from "@app/prefabs";
import Angle from "@app/types/Angle";
import ScaledValue from "@app/types/ScaledValue";

export type TurretAngle =
  | { type: "relative"; rel: Angle }
  | { type: "lastMovement" }
  | { type: "nearestEnemy" }
  | { type: "random" };

export type TurretBullet = {
  type: "bullet";
  canDouble?: boolean;
  name: string;
  prefab: PrefabName;
  angle: TurretAngle;
  vel: number;
  offset?: Position;
  beam?: {
    duration: number;
    length: ScaledValue;
    appearance: Partial<Appearance>[];
  };
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
