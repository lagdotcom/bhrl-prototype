import { Colors } from "wglt";
import Engine from "../Engine";
import Entity from "../Entity";
import { Layer } from "../components/Appearance";

export function bullet(g: Engine) {
  return new Entity(g, "Bullet")
    .setProjectile(true)
    .setAppearance({ glyph: ".", layer: Layer.Bullet, fg: Colors.YELLOW });
}

export function missile(g: Engine) {
  const parent = new Entity(g, "Missile")
    .setProjectile(true)
    .setHoming({ strength: 0.15, duration: 10 })
    .setAppearance({ glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED });

  new Entity(g, "MissileTrail")
    .setAttachment({ parent, x: 0, y: 0 })
    .setTrail({ effectPrefab: "puff" })
    .setLifetime({ duration: 10 });

  return parent;
}
