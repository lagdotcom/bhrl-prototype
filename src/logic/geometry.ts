import { Position } from "@app/components";

/// thanks https://www.redblobgames.com/grids/line-drawing.html#stepping
export function walkGrid(p0: Position, p1: Position) {
  const dx = p1.x - p0.x,
    dy = p1.y - p0.y,
    nx = Math.abs(dx),
    ny = Math.abs(dy),
    signX = dx > 0 ? 1 : -1,
    signY = dy > 0 ? 1 : -1;

  const p = { ...p0 };
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
