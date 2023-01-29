import { BlendMode, fromRgb } from "wglt";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/types/Layer";

export function AirFistRange(g: Engine) {
  return new Entity(g, "AirFistRange")
    .setAppearance({
      glyph: " ",
      layer: Layer.Effect,
      bg: fromRgb(0, 255, 255, 100),
      blendMode: BlendMode.Add,
    })
    .setLifetime({ duration: 2 });
}

export function SmokePuff(g: Engine) {
  return new Entity(g, "SmokePuff")
    .setAppearance({
      glyph: " ",
      layer: Layer.Effect,
      bg: fromRgb(100, 100, 100, 50),
      blendMode: BlendMode.Add,
    })
    .setLifetime({ duration: 2 });
}
