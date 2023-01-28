import { BlendMode, fromRgb } from "wglt";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/Layer";

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
