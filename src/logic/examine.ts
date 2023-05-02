import { Position } from "@app/components";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Glyphs from "@app/logic/glyphs";
import EntityInfo from "@app/ui/EntityInfo";
import { Colors } from "wglt";

export function drawExamineOverlay(
  g: Engine,
  pos: Position,
  entities: Entity[]
) {
  if (!entities.length) return;

  const info: EntityInfo[] = [];

  for (const e of entities) {
    const ei = new EntityInfo(g, e);
    if (ei.height) info.push(ei);
  }

  if (!info.length) return;

  const width = Math.max(...info.map((i) => i.width)) + 2;
  const height = info.reduce((p, v) => p + v.height, 1 + info.length);

  const sx = Math.min(pos.x + 2, g.term.width - width);
  const sy = Math.min(pos.y, g.term.height - height);

  g.term.fillRect(sx, sy, width, height, " ", Colors.WHITE, Colors.BLACK);
  g.term.drawDoubleBox(sx, sy, width, height);
  let y = sy + 1;

  for (const ei of info) {
    if (y > sy + 1) {
      g.term.drawChar(sx, y - 1, Glyphs.BoxRightSingleVerticalDouble);
      g.term.drawHLine(sx + 1, y - 1, width - 1, Glyphs.BoxHorizontalSingle);
      g.term.drawChar(
        sx + width - 1,
        y - 1,
        Glyphs.BoxLeftSingleVerticalDouble
      );
    }

    ei.draw(sx + 1, y);
    y += ei.height + 1;
  }
}
