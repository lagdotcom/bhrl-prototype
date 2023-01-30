import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const Battleship: Prefab = {
  children: [
    { name: "BattleshipHull", x: 1, y: 0 },
    { name: "BattleshipHull", x: 2, y: 0 },
    { name: "BattleshipHull", x: 0, y: 1 },
    { name: "BattleshipHull", x: 1, y: 1 },
    { name: "BattleshipHull", x: 2, y: 1 },
    { name: "MachineGun", x: 0, y: 1 },
    { name: "HomingMissileLauncher", x: 2, y: 1 },
  ],
};

export const BattleshipHull: Prefab = {
  components: {
    solid: true,
    appearance: {
      glyph: "/",
      layer: Layer.Ship,
      fg: Colors.WHITE,
      bg: Colors.BROWN,
    },
  },
};
