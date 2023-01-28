import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/types/Layer";

export function Battleship(g: Engine) {
  const parent = new Entity(g, "Battleship");

  g.spawn("BattleshipHull").setAttachment({ parent, x: 1, y: 0 });
  g.spawn("BattleshipHull").setAttachment({ parent, x: 2, y: 0 });
  g.spawn("BattleshipHull").setAttachment({ parent, x: 0, y: 1 });
  g.spawn("BattleshipHull").setAttachment({ parent, x: 1, y: 1 });
  g.spawn("BattleshipHull").setAttachment({ parent, x: 2, y: 1 });

  g.spawn("MachineGun").setAttachment({ parent, x: 0, y: 1 });
  g.spawn("HomingMissileLauncher").setAttachment({ parent, x: 2, y: 1 });

  return parent;
}

export function BattleshipHull(g: Engine) {
  return new Entity(g, "BattleshipHull")
    .setAppearance({
      glyph: "/",
      layer: Layer.Ship,
      fg: Colors.WHITE,
      bg: Colors.BROWN,
    })
    .setSolid(true);
}
