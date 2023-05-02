import AI from "@app/components/AI";
import Appearance from "@app/components/Appearance";
import Attachment from "@app/components/Attachment";
import DelayedShot from "@app/components/DelayedShot";
import DoubleShot from "@app/components/DoubleShot";
import Explodes from "@app/components/Explodes";
import Field from "@app/components/Field";
import Homing from "@app/components/Homing";
import IgnoreSolid from "@app/components/IgnoreSolid";
import Item from "@app/components/Item";
import LastMovement from "@app/components/LastMovement";
import Lifetime from "@app/components/Lifetime";
import Motion from "@app/components/Motion";
import Origin from "@app/components/Origin";
import Pilot from "@app/components/Pilot";
import Player from "@app/components/Player";
import Position from "@app/components/Position";
import Projectile from "@app/components/Projectile";
import Ship from "@app/components/Ship";
import Trail from "@app/components/Trail";
import Turret from "@app/components/Turret";

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
