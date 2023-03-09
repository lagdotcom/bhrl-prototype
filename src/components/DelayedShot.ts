import Turret, { TurretShot } from "./Turret";

type DelayedShot = { shots: { turret: Turret; shot: TurretShot }[] };
export default DelayedShot;
