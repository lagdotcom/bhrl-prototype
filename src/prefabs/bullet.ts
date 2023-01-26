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
    .setAppearance({ glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED });

  new Entity(g, "MissileTrail")
    .setAttachment({ parent, x: 0, y: 0 })
    .setTrail({ effectPrefab: "SmokePuff" })
    .setLifetime({ duration: 10 });

  return parent;
}
