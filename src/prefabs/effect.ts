import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/Layer";

export function SmokePuff(g: Engine) {
  return new Entity(g, "SmokePuff")
    .setAppearance({ glyph: " ", layer: Layer.Effect, bg: Colors.LIGHT_GRAY })
    .setLifetime({ duration: 2 });
}
