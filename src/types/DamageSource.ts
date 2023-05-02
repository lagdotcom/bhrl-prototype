import { Ship, Turret } from "@app/components";
import Entity from "@app/Entity";

type DamageSource = {
  e: Entity;
  owner: Entity;
  ship?: Ship;
  turret?: Turret;
};
export default DamageSource;
