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
};

export type TagComponent = "player" | "projectile" | "solid";

export type ComponentAttribute = keyof ComponentMap;
export type ComponentType = ComponentMap[ComponentAttribute];

export type EntityMap = ComponentMap & { [K in TagComponent]: boolean };
export type EntityAttribute = keyof EntityMap;

export {
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
