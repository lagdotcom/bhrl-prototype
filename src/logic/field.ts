import { Appearance, Field, Position } from "@app/components";

import { BlendMode } from "wglt";
import FieldType from "@app/types/FieldType";
import GradientRun from "@app/GradientRun";
import Layer from "@app/types/Layer";
import distance from "@app/tools/distance";

export type FieldCell = { x: number; y: number; intensity: number };

const fieldGradients: Record<FieldType, GradientRun> = {
  fire: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [255, 0, 0, 150]],
    [4, [255, 255, 0, 150]],
    [6, [255, 255, 255, 150]],
    [10, [255, 255, 255, 255]],
  ]),
};

export function getFieldAppearance(field: Field): Appearance | undefined {
  if (field.intensity <= 0) return undefined;

  return {
    glyph: " ",
    layer: Layer.Effect,
    bg: fieldGradients[field.type].get(field.intensity),
    blendMode: BlendMode.Add,
  };
}

// TODO shape around walls lol
export function generateField(centre: Position, size: number) {
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
