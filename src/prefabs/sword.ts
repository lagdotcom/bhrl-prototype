import { Colors } from "wglt";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { turret } from "./tools";

export const SwordBullet: Prefab = {
  components: {
    projectile: { damage: 5 },
    appearance: {
      glyph: Glyphs.Star,
      layer: Layer.Bullet,
      fg: Colors.LIGHT_GREEN,
    },
  },
};

export const Sword: Prefab = {
  components: {
    turret: turret("Sword", "lastMovement", {
      bulletPrefab: "SwordBullet",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenSalvos: 20,
      beam: {
        duration: 2,
        appearance: [
          { glyph: Glyphs.Star, fg: Colors.LIGHT_GREEN },
          { glyph: "o", fg: Colors.LIGHT_GREEN },
          { glyph: Glyphs.Diamond, fg: Colors.LIGHT_GREEN },
          { glyph: Glyphs.Ring, fg: Colors.DARK_GREEN },
          { glyph: Glyphs.Dot, fg: Colors.DARK_GRAY },
        ],
      },
    }),
  },
};
