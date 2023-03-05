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

  for (const e of entities) {
    if (e.ship) {
      const object = new ShipInfo(g, e.ship);
      instructions.push({ x, y, object });

      y += object.height + 1;
    }

    if (e.pilot) {
      const object = new PilotInfo(g, e.pilot);
      instructions.push({ x, y, object });

      y += object.height + 1;
    }

    const tree = getEntityTree(g, e);

    for (const weapon of tree.filter((x) => x.turret)) {
      const object = new WeaponInfo(g, weapon.turret!);
      instructions.push({ x, y, object });

      y += object.height + 1;
    }
  }

  const width = Math.max(...instructions.map((i) => i.object.width)) + 2;

  const sx = Math.min(pos.x + 2, g.term.width - width);
  const sy = Math.min(pos.y, g.term.height - y);

  g.term.fillRect(sx, sy, width, y, " ", Colors.WHITE, Colors.BLACK);
  g.term.drawSingleBox(sx, sy, width, y);
  for (const inst of instructions) inst.object.draw(sx + inst.x, sy + inst.y);
}
