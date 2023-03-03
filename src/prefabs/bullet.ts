import { Colors } from "wglt";
import { InvertedExclamation } from "@app/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const Bullet: Prefab = {
  components: {
    projectile: { damage: 1 },
    appearance: { glyph: ".", layer: Layer.Bullet, fg: Colors.YELLOW },
  },
};

export const HomingMissile: Prefab = {
  components: {
    projectile: { damage: 1 },
    homing: { strength: 0.15, duration: 10 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 5, falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};

export const PlayerBullet: Prefab = {
  components: {
    projectile: { damage: 1 },
    appearance: {
      glyph: InvertedExclamation,
      layer: Layer.Bullet,
      fg: Colors.YELLOW,
    },
  },
};
