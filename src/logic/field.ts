import { Appearance, Field, Position } from "@app/components";
import GradientRun from "@app/GradientRun";
import distance from "@app/tools/distance";
import FieldType from "@app/types/FieldType";
import Layer from "@app/types/Layer";
import { BlendMode } from "wglt";

export type FieldCell = { x: number; y: number; intensity: number };

const fieldGradients: Record<FieldType, GradientRun> = {
  Fire: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [255, 0, 0, 150]],
    [4, [255, 255, 0, 150]],
    [6, [255, 255, 255, 150]],
    [10, [255, 255, 255, 255]],
  ]),
  Blue: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [0, 0, 255, 150]],
    [4, [0, 155, 255, 150]],
    [6, [255, 255, 255, 150]],
    [10, [255, 255, 255, 255]],
  ]),
  Yellow: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [155, 155, 0, 150]],
    [4, [255, 255, 55, 150]],
    [6, [255, 255, 255, 150]],
    [10, [255, 255, 255, 255]],
  ]),
  Green: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [0, 215, 0, 150]],
    [4, [55, 255, 55, 150]],
    [6, [215, 255, 215, 150]],
    [10, [255, 255, 255, 255]],
  ]),
  Magenta: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [155, 0, 115, 150]],
    [4, [255, 115, 255, 150]],
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
