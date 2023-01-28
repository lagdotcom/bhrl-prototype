import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Layer from "@app/Layer";

export function Bullet(g: Engine) {
  return new Entity(g, "Bullet")
    .setProjectile(true)
    .setAppearance({ glyph: ".", layer: Layer.Bullet, fg: Colors.YELLOW });
}

export function HomingMissile(g: Engine) {
  const parent = new Entity(g, "HomingMissile")
    .setProjectile(true)
    .setHoming({ strength: 0.15, duration: 10 })
    .setTrail({ effectPrefab: "SmokePuff" })
    .setAppearance({ glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED });

  return parent;
}
