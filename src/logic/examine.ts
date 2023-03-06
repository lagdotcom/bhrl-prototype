import BulletInfo from "@app/ui/BulletInfo";
import { Colors } from "wglt";
import Drawable from "@app/types/Drawable";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import PilotInfo from "@app/ui/PilotInfo";
import { Position } from "@app/components";
import ShipInfo from "@app/ui/ShipInfo";
import WeaponInfo from "@app/ui/WeaponInfo";
import { getEntityTree } from "@app/logic/entity";

type DrawInstruction = { x: number; y: number; object: Drawable };

export function drawExamineOverlay(
  g: Engine,
  pos: Position,
  entities: Entity[]
) {
  if (!entities.length) return;

  const instructions: DrawInstruction[] = [];

  const x = 1;
  let y = 1;

  const add = (object: Drawable) => {
    instructions.push({ x, y, object });
    y += object.height + 1;
  };

  for (const e of entities) {
    if (e.ship) add(new ShipInfo(g, e.ship));
    if (e.pilot) add(new PilotInfo(g, e.pilot, true));

    const tree = getEntityTree(g, e);

    for (const weapon of tree.filter((x) => x.turret))
      add(new WeaponInfo(g, weapon.turret!));

    if (e.motion || e.projectile || e.homing) add(new BulletInfo(g, e));
  }

  if (!instructions.length) return;

  const width = Math.max(...instructions.map((i) => i.object.width)) + 2;

  const sx = Math.min(pos.x + 2, g.term.width - width);
  const sy = Math.min(pos.y, g.term.height - y);

  g.term.fillRect(sx, sy, width, y, " ", Colors.WHITE, Colors.BLACK);
  g.term.drawSingleBox(sx, sy, width, y);
  for (const inst of instructions) inst.object.draw(sx + inst.x, sy + inst.y);
}
