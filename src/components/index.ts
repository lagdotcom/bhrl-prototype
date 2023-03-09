import AI from "./AI";
import Appearance from "./Appearance";
import Attachment from "./Attachment";
import DelayedShot from "./DelayedShot";
import DoubleShot from "./DoubleShot";
import Explodes from "./Explodes";
import Field from "./Field";
import Homing from "./Homing";
import IgnoreSolid from "./IgnoreSolid";
import Item from "./Item";
import LastMovement from "./LastMovement";
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
  delayedShot: DelayedShot;
  doubleShot: DoubleShot;
  explodes: Explodes;
  field: Field;
  homing: Homing;
  ignoreSolid: IgnoreSolid;
  item: Item;
  lastMovement: LastMovement;
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
  DelayedShot,
  DoubleShot,
  Explodes,
  Field,
  Homing,
  IgnoreSolid,
  Item,
  LastMovement,
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
