import Appearance, { Layer } from "../components/Appearance";

import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import Lifetime from "../components/Lifetime";

export function puff(g: Engine) {
  return new Entity(g, "Puff")
    .setAppearance(new Appearance("#", Layer.Effect, Colors.LIGHT_GRAY))
    .setLifetime(new Lifetime(2));
}
