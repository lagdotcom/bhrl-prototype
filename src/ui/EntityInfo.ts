import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { entityHasComponents, getEntityTree } from "@app/logic/entity";
import Drawable from "@app/types/Drawable";
import BulletInfo from "@app/ui/BulletInfo";
import FieldInfo from "@app/ui/FieldInfo";
import ItemInfo from "@app/ui/ItemInfo";
import PilotInfo from "@app/ui/PilotInfo";
import PowerUpInfo from "@app/ui/PowerUpInfo";
import ShipInfo from "@app/ui/ShipInfo";
import WeaponInfo from "@app/ui/WeaponInfo";

type DrawInstruction = { x: number; y: number; object: Drawable };

export default class EntityInfo implements Drawable {
  instructions: DrawInstruction[];
  width: number;
  height: number;

  constructor(public g: Engine, public e: Entity) {
    this.instructions = [];

    const x = 0;
    let y = 0;
    this.width = 0;

    const add = (object: Drawable) => {
      this.instructions.push({ x, y, object });
      y += object.height + 1;
      this.width = Math.max(this.width, x + object.width);
    };

    if (e.ship) add(new ShipInfo(g, e.ship));
    if (e.pilot) add(new PilotInfo(g, e.pilot, true));

    if (e.doubleShot) add(new PowerUpInfo(g, e));

    const tree = getEntityTree(g, e);

    for (const weapon of tree.filter(entityHasComponents(["turret"])))
      add(new WeaponInfo(g, weapon.turret));

    if (e.item) add(new ItemInfo(g, e.item));
    else if (e.motion || e.projectile || e.homing || e.lifetime || e.explodes)
      add(new BulletInfo(g, e));

    if (e.field) add(new FieldInfo(g, e.field));

    this.height = y - 1;
  }

  draw(sx: number, sy: number) {
    for (const { x, y, object } of this.instructions)
      object.draw(sx + x, sy + y);
  }
}
