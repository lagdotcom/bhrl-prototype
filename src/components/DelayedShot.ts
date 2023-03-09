import Turret, { TurretBullet } from "./Turret";

type DelayedShot = { shots: { turret: Turret; bullet: TurretBullet }[] };
export default DelayedShot;
