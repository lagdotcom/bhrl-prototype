import AI from "./AI";
import Appearance from "./Appearance";
import Attachment from "./Attachment";
import Explodes from "./Explodes";
import Field from "./Field";
import Homing from "./Homing";
import IgnoreSolid from "./IgnoreSolid";
import Lifetime from "./Lifetime";
import Motion from "./Motion";
import Position from "./Position";
import Trail from "./Trail";
import Turret from "./Turret";

export type ComponentMap = {
  ai: AI;
  appearance: Appearance;
  attachment: Attachment;
  explodes: Explodes;
  field: Field;
  homing: Homing;
  ignoreSolid: IgnoreSolid;
  lifetime: Lifetime;
  motion: Motion;
  position: Position;
  trail: Trail;
  turret: Turret;

  player: boolean;
  projectile: boolean;
  solid: boolean;
};
export type EntityAttribute = keyof ComponentMap;

export {
  AI,
  Appearance,
  Attachment,
  Explodes,
  Field,
  Homing,
  IgnoreSolid,
  Lifetime,
  Motion,
  Position,
  Trail,
  Turret,
};

export const makeTurret = ({
  bulletPrefab = "Bullet",
  bulletVelocity = 1,
  salvoCount = 1,
  timeBetweenShots = 1,
  timeBetweenSalvos = 1,
}: Partial<Turret>): Turret => ({
  bulletPrefab,
  bulletVelocity,
  salvoCount,
  timeBetweenShots,
  timeBetweenSalvos,
  timer: 0,
  salvo: salvoCount,
});
