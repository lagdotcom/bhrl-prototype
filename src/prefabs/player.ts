import { Colors } from "wglt";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const PlayerHull: Prefab = {
  components: {
    solid: true,
    appearance: {
      glyph: "#",
      layer: Layer.Player,
      fg: Colors.WHITE,
      bg: Colors.DARK_RED,
    },
  },
};

export const PlayerShip: Prefab = {
  components: {
    player: { weaponArrays: ["primary"] },
    ship: { name: "Your Ship", hp: 20, maxHp: 20 },
  },
  children: [
    {
      name: "PlayerHull",
      x: 0,
      y: 0,
      overlay: { appearance: { glyph: Glyphs.LeftArrow, bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 1,
      y: 0,
      overlay: { appearance: { glyph: Glyphs.Club, bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 2,
      y: 0,
      overlay: {
        appearance: { glyph: Glyphs.RightArrow, bg: Colors.DARK_RED },
      },
    },
    { name: "PlayerGun", x: 1, y: 0, tags: ["primary"] },
  ],
};
