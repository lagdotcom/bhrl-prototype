import Turret, { TurretShot } from "@app/components/Turret";

type DelayedShot = { shots: { turret: Turret; shot: TurretShot }[] };
export default DelayedShot;
