import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const Bullet: Prefab = {
  components: {
    projectile: true,
    appearance: { glyph: ".", layer: Layer.Bullet, fg: Colors.YELLOW },
  },
};

export const HomingMissile: Prefab = {
  components: {
    projectile: true,
    homing: { strength: 0.15, duration: 10 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 5, falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};
