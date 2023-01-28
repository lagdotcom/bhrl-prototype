import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/Layer";

export function Player(g: Engine) {
  return new Entity(g, "Player").setPlayer(true).setSolid(true).setAppearance({
    glyph: ">",
    layer: Layer.Player,
    fg: Colors.WHITE,
    bg: Colors.DARK_RED,
  });
}
