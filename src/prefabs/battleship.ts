import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import { Layer } from "../components/Appearance";

export function battleship(g: Engine) {
  const parent = new Entity(g, "Battleship");

  g.spawn("battleshipHull").setAttachment({ parent, x: 1, y: 0 });
  g.spawn("battleshipHull").setAttachment({ parent, x: 2, y: 0 });
  g.spawn("battleshipHull").setAttachment({ parent, x: 0, y: 1 });
  g.spawn("battleshipHull").setAttachment({ parent, x: 1, y: 1 });
  g.spawn("battleshipHull").setAttachment({ parent, x: 2, y: 1 });

  g.spawn("machineGun").setAttachment({ parent, x: 0, y: 1 });
  g.spawn("missileLauncher").setAttachment({ parent, x: 2, y: 1 });

  return parent;
}

export function battleshipHull(g: Engine) {
  return new Entity(g, "BattleshipHull")
    .setAppearance({
      glyph: "/",
      layer: Layer.Ship,
      fg: Colors.WHITE,
      bg: Colors.BROWN,
    })
    .setSolid(true);
}
