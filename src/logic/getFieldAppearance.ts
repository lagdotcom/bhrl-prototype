import { Appearance, Field } from "@app/components";

import { BlendMode } from "wglt";
import FieldType from "@app/types/FieldType";
import GradientRun from "@app/GradientRun";
import Layer from "@app/types/Layer";

const fieldGradients: Record<FieldType, GradientRun> = {
  fire: new GradientRun([
    [0, [0, 0, 0, 0]],
    [2, [255, 0, 0, 150]],
    [4, [255, 255, 0, 150]],
    [6, [255, 255, 255, 150]],
    [10, [255, 255, 255, 255]],
  ]),
};

function getFieldColour(type: FieldType, intensity: number): number {
  return fieldGradients[type].get(intensity);
}

export default function getFieldAppearance(
  field: Field
): Appearance | undefined {
  if (field.intensity <= 0) return undefined;

  return {
    glyph: " ",
    layer: Layer.Effect,
    bg: getFieldColour(field.type, field.intensity),
    blendMode: BlendMode.Add,
  };
}
