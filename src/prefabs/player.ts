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
      overlay: { appearance: { glyph: "\x1b", bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 1,
      y: 0,
      overlay: { appearance: { glyph: "\x05", bg: Colors.DARK_RED } },
    },
    {
      name: "PlayerHull",
      x: 2,
      y: 0,
      overlay: { appearance: { glyph: "\x1a", bg: Colors.DARK_RED } },
    },
    {
      name: "MachineGun",
      x: 1,
      y: 0,
      tags: ["primary"],
    },
  ],
};
