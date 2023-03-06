import AI from "./AI";
import Appearance from "./Appearance";
import Attachment from "./Attachment";
import Explodes from "./Explodes";
import Field from "./Field";
import Homing from "./Homing";
import IgnoreSolid from "./IgnoreSolid";
import Lifetime from "./Lifetime";
import Motion from "./Motion";
import Origin from "./Origin";
import Pilot from "./Pilot";
import Player from "./Player";
import Position from "./Position";
import Projectile from "./Projectile";
import Ship from "./Ship";
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
  origin: Origin;
  pilot: Pilot;
  position: Position;
  player: Player;
  projectile: Projectile;
  ship: Ship;
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
  IgnoreSolid,
  Lifetime,
  Motion,
  Origin,
  Pilot,
  Player,
  Position,
  Projectile,
  Ship,
  Trail,
  Turret,
};

export const makeTurret = (
  name: string,
  bulletAngle: Turret["bulletAngle"],
  {
    bulletPrefab = "Bullet",
    bulletVelocity = 1,
    salvoCount = 1,
    timeBetweenShots = 1,
    timeBetweenSalvos = 1,
  }: Partial<Turret>
): Turret => ({
  name,
  bulletPrefab,
  bulletAngle,
  bulletVelocity,
  salvoCount,
  timeBetweenShots,
  timeBetweenSalvos,
  timer: 0,
  salvo: salvoCount,
});
