import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import { Layer } from "../components/Appearance";

export function machineGun(g: Engine) {
  return new Entity(g, "MachineGun")
    .setAppearance({ glyph: "o", layer: Layer.Gun, fg: Colors.WHITE })
    .setTurret({
      bulletPrefab: "bullet",
      bulletVelocity: 2,
      salvoCount: 5,
      timeBetweenShots: 0,
      timeBetweenSalvos: 12,
    });
}

export function missileLauncher(g: Engine) {
  return new Entity(g, "MissileLauncher")
    .setAppearance({ glyph: "o", layer: Layer.Gun, fg: Colors.YELLOW })
    .setTurret({
      bulletPrefab: "missile",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenShots: 8,
      timeBetweenSalvos: 8,
    });
}
