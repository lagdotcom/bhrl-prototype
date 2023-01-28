import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/types/Layer";

export function MachineGun(g: Engine) {
  return new Entity(g, "MachineGun")
    .setAppearance({ glyph: "o", layer: Layer.Gun, fg: Colors.WHITE })
    .setTurret({
      bulletPrefab: "Bullet",
      bulletVelocity: 2,
      salvoCount: 5,
      timeBetweenShots: 0,
      timeBetweenSalvos: 12,
    });
}

export function HomingMissileLauncher(g: Engine) {
  return new Entity(g, "HomingMissileLauncher")
    .setAppearance({ glyph: "o", layer: Layer.Gun, fg: Colors.YELLOW })
    .setTurret({
      bulletPrefab: "HomingMissile",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenShots: 8,
      timeBetweenSalvos: 8,
    });
}
