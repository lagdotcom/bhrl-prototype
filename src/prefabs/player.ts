import Glyphs from "@app/logic/glyphs";
import { child, ship } from "@app/prefabs/tools";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { Colors } from "wglt";

export const PlayerHull: Prefab = {
  components: {
    solid: true,
    appearance: { glyph: "#", layer: Layer.Player, fg: Colors.DARK_GRAY },
  },
};

export const PlayerShip: Prefab = {
  components: {
    player: { weaponArrays: ["Primary", "Secondary"], bombs: [] },
    ship: ship("Ace of Clubs", "Player", 20, 10),
    explodes: { type: "Fire", size: 6, falloff: 1 },
  },
  children: [
    child("PlayerHull", 0, 0, { appearance: { glyph: Glyphs.LeftArrow } }),
    child("PlayerHull", 1, 0, {
      appearance: { glyph: Glyphs.Club, fg: Colors.LIGHT_GRAY },
    }),
    child("PlayerHull", 2, 0, { appearance: { glyph: Glyphs.RightArrow } }),
    child("PlayerGun", 1, 0, undefined, ["Primary"]),
    child("Sword", 1, 0, undefined, ["Secondary"]),
  ],
};
