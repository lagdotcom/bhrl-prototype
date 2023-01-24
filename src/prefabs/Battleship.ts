import Appearance, { Layer } from "../components/Appearance";

import Attachment from "../components/Attachment";
import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import Turret from "../components/Turret";

export default function getBattleship(g: Engine) {
  const ship = new Entity(g, "Battleship");
  const parts = [
    new Entity(g, "BattleshipHull")
      .setAttachment(new Attachment(ship, 1, 0))
      .setAppearance(
        new Appearance("/", Layer.Ship, Colors.WHITE, Colors.BROWN)
      )
      .setSolid(true),
    new Entity(g, "BattleshipHull")
      .setAttachment(new Attachment(ship, 2, 0))
      .setAppearance(
        new Appearance("#", Layer.Ship, Colors.WHITE, Colors.BROWN)
      )
      .setSolid(true),
    new Entity(g, "BattleshipTurret")
      .setAttachment(new Attachment(ship, 0, 1))
      .setAppearance(
        new Appearance("o", Layer.Ship, Colors.WHITE, Colors.BROWN)
      )
      .setTurret(new Turret(3, 2, 1, 5))
      .setSolid(true),
    new Entity(g, "BattleshipHull")
      .setAttachment(new Attachment(ship, 1, 1))
      .setAppearance(
        new Appearance("#", Layer.Ship, Colors.WHITE, Colors.BROWN)
      )
      .setSolid(true),
    new Entity(g, "BattleshipTurret")
      .setAttachment(new Attachment(ship, 2, 1))
      .setAppearance(
        new Appearance("o", Layer.Ship, Colors.WHITE, Colors.BROWN)
      )
      .setTurret(new Turret(2, 5, 0, 12))
      .setSolid(true),
  ];

  return { ship, parts };
}
