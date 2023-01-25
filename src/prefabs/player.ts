import Appearance, { Layer } from "../components/Appearance";

import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";

export function player(g: Engine) {
  return new Entity(g, "Player")
    .setPlayer(true)
    .setAppearance(
      new Appearance(">", Layer.Player, Colors.WHITE, Colors.DARK_RED)
    );
}
