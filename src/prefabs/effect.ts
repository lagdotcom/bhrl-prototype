import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import { Layer } from "../components/Appearance";

export function puff(g: Engine) {
  return new Entity(g, "Puff")
    .setAppearance({ glyph: " ", layer: Layer.Effect, bg: Colors.LIGHT_GRAY })
    .setLifetime({ duration: 2 });
}
