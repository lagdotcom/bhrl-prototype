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
  components: { player: true },
  children: [
    { name: "PlayerHull", x: 0, y: 0 },
    {
      name: "PlayerHull",
      x: 1,
      y: 0,
      overlay: { appearance: { glyph: ">" } },
    },
  ],
};
