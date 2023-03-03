import AI from "./AI";
import Appearance from "./Appearance";
import Attachment from "./Attachment";
import Explodes from "./Explodes";
import Field from "./Field";
import Homing from "./Homing";
import Hull from "./Hull";
import IgnoreSolid from "./IgnoreSolid";
import Lifetime from "./Lifetime";
import Motion from "./Motion";
import Player from "./Player";
import Position from "./Position";
import Projectile from "./Projectile";
import Trail from "./Trail";
import Turret from "./Turret";

export type ComponentMap = {
  ai: AI;
  appearance: Appearance;
  attachment: Attachment;
  explodes: Explodes;
  field: Field;
  homing: Homing;
  hull: Hull;
  ignoreSolid: IgnoreSolid;
  lifetime: Lifetime;
  motion: Motion;
  position: Position;
  player: Player;
  projectile: Projectile;
  trail: Trail;
  turret: Turret;

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
  Hull,
  IgnoreSolid,
  Lifetime,
  Motion,
  Player,
  Position,
  Projectile,
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
