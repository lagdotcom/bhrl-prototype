import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/types/Layer";

export function Player(g: Engine) {
  const parent = new Entity(g, "Player").setPlayer(true);

  g.spawn("PlayerHull").setAttachment({ parent, x: 0, y: 0 });

  const cone = g.spawn("PlayerHull").setAttachment({ parent, x: 1, y: 0 });
  cone.appearance!.glyph = ">";

  return parent;
}

export function PlayerHull(g: Engine) {
  return new Entity(g, "PlayerHull").setSolid(true).setAppearance({
    glyph: "#",
    layer: Layer.Player,
    fg: Colors.WHITE,
    bg: Colors.DARK_RED,
  });
}
