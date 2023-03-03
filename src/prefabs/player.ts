import { Club, LeftArrow, RightArrow } from "@app/glyphs";

import { Colors } from "wglt";
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

export const Player: Prefab = {
  components: {
    player: { visionRange: 20, weaponArrays: ["primary"] },
    hull: { hp: 20, maxHp: 20 },
  },
  children: [
    {
      name: "PlayerHull",
      x: 0,
      y: 0,
      overlay: { appearance: { glyph: LeftArrow, bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 1,
      y: 0,
      overlay: { appearance: { glyph: Club, bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 2,
      y: 0,
      overlay: { appearance: { glyph: RightArrow, bg: Colors.DARK_RED } },
    },
    { name: "PlayerGun", x: 1, y: 0, tags: ["primary"] },
  ],
};
