import { Colors } from "wglt";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { child } from "@app/prefabs/tools";

export const PlayerHull: Prefab = {
  components: {
    solid: true,
    appearance: { glyph: "#", layer: Layer.Player, fg: Colors.DARK_GRAY },
  },
};

export const PlayerShip: Prefab = {
  components: {
    player: { weaponArrays: ["Primary"] },
    ship: { name: "Alpha", hp: 20, maxHp: 20 },
  },
  children: [
    child("PlayerHull", 0, 0, { appearance: { glyph: Glyphs.LeftArrow } }),
    child("PlayerHull", 1, 0, {
      appearance: { glyph: Glyphs.Club, fg: Colors.LIGHT_GRAY },
    }),
    child("PlayerHull", 2, 0, { appearance: { glyph: Glyphs.RightArrow } }),
    child("PlayerGun", 1, 0, undefined, ["Primary"]),
  ],
};
