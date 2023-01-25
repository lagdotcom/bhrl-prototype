import Appearance, { Layer } from "../components/Appearance";

import Attachment from "../components/Attachment";
import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";

export function battleship(g: Engine) {
  const ship = new Entity(g, "Battleship");

  g.spawn("battleshipHull").setAttachment(new Attachment(ship, 1, 0));
  g.spawn("battleshipHull").setAttachment(new Attachment(ship, 2, 0));
  g.spawn("machineGun").setAttachment(new Attachment(ship, 0, 1));
  g.spawn("battleshipHull").setAttachment(new Attachment(ship, 1, 1));
  g.spawn("missileLauncher").setAttachment(new Attachment(ship, 2, 1));

  return ship;
}

export function battleshipHull(g: Engine) {
  return new Entity(g, "BattleshipHull")
    .setAppearance(new Appearance("/", Layer.Ship, Colors.WHITE, Colors.BROWN))
    .setSolid(true);
}
