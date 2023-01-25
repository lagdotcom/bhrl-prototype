import Appearance, { Layer } from "../components/Appearance";

import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import Homing from "../components/Homing";
import Trail from "../components/Trail";

export function bullet(g: Engine) {
  return new Entity(g, "Bullet")
    .setProjectile(true)
    .setAppearance(new Appearance(".", Layer.Bullet, Colors.YELLOW));
}

export function missile(g: Engine) {
  return new Entity(g, "Missile")
    .setProjectile(true)
    .setHoming(new Homing(0.15, 10))
    .setTrail(new Trail("puff", 10))
    .setAppearance(new Appearance("*", Layer.Bullet, Colors.DARK_RED));
}
