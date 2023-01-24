import Appearance, { Layer } from "../components/Appearance";

import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";

export default function getBullet(g: Engine) {
  return new Entity(g, "Bullet")
    .setProjectile(true)
    .setAppearance(new Appearance(".", Layer.Bullet, Colors.YELLOW));
}
