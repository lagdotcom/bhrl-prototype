import Appearance, { Layer } from "../components/Appearance";

import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import Turret from "../components/Turret";

export function machineGun(g: Engine) {
  return new Entity(g, "MachineGun")
    .setAppearance(new Appearance("o", Layer.Ship, Colors.WHITE, Colors.BROWN))
    .setTurret(new Turret("bullet", 2, 5, 0, 12))
    .setSolid(true);
}

export function missileLauncher(g: Engine) {
  return new Entity(g, "MissileLauncher")
    .setAppearance(new Appearance("o", Layer.Ship, Colors.YELLOW, Colors.BROWN))
    .setTurret(new Turret("missile", 1, 1, 8, 8))
    .setSolid(true);
}
