import { Position } from "@app/components";
import distance from "@app/tools/distance";

export type FieldCell = { x: number; y: number; intensity: number };

export default function generateField(centre: Position, size: number) {
  const parts: FieldCell[] = [];

  const minX = Math.floor(centre.x - size);
  const maxX = Math.ceil(centre.x + size);
  const minY = Math.floor(centre.y - size);
  const maxY = Math.ceil(centre.y + size);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dist = distance(centre, { x, y });
      if (dist >= size) continue;

      parts.push({ x, y, intensity: size - dist });
    }
  }

  return parts;
}
