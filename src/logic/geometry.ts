import { Position } from "@app/components";
import int from "@app/tools/int";

/// thanks https://www.redblobgames.com/grids/line-drawing.html#stepping
export function walkGrid(a: Position, b: Position) {
  const dx = b.x - a.x,
    dy = b.y - a.y,
    nx = Math.abs(dx),
    ny = Math.abs(dy),
    signX = dx > 0 ? 1 : -1,
    signY = dy > 0 ? 1 : -1;

  const p = { ...a };
  const points = [{ ...p }];
  for (let ix = 0, iy = 0; ix < nx || iy < ny; ) {
    if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += signX;
      ix++;
    } else {
      // next step is vertical
      p.y += signY;
      iy++;
    }
    points.push({ ...p });
  }
  return points;
}

/// thanks https://www.redblobgames.com/grids/circle-drawing/#outline
export function getCirclePoints(cx: number, cy: number, radius: number) {
  const points: Position[] = [];

  const add = (rawX: number, rawY: number) => {
    const x = int(rawX);
    const y = int(rawY);
    if (!points.find((p) => p.x === x && p.y === y)) points.push({ x, y });
  };

  for (let r = 0; r <= Math.floor(radius * Math.sqrt(0.5)); r++) {
    const d = Math.floor(Math.sqrt(radius * radius - r * r));
    add(cx - d, cy + r);
    add(cx + d, cy + r);
    add(cx - d, cy - r);
    add(cx + d, cy - r);
    add(cx + r, cy - d);
    add(cx + r, cy + d);
    add(cx - r, cy - d);
    add(cx - r, cy + d);
  }

  return points;
}
