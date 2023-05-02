import Glyphs from "@app/logic/glyphs";
import { bullet, turret } from "@app/prefabs/tools";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { Colors } from "wglt";

export const SwordBullet: Prefab = {
  components: {
    projectile: {
      damage: 5,
      special: "increasedDropChance",
      scaling: { stat: "spirit", multiplier: 1 },
    },
    appearance: {
      glyph: Glyphs.Star,
      layer: Layer.PlayerBullet,
      fg: Colors.LIGHT_GREEN,
    },
  },
};

export const Sword: Prefab = {
  components: {
    turret: turret("Sword", { salvoCount: 1, timeBetweenSalvos: 20 }, [
      bullet("Stab", "SwordBullet", { type: "lastMovement" }, 1, {
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
    ]),
  },
};
