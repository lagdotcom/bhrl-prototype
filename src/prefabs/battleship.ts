import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { ship } from "@app/prefabs/tools";

export const Battleship: Prefab = {
  components: {
    ai: { idealDistance: 8, speed: 1 },
    ship: ship("Battleship", 40),
  },
  children: [
    { name: "BattleshipHull", x: 1, y: 0 },
    { name: "BattleshipHull", x: 2, y: 0 },
    { name: "BattleshipHull", x: 0, y: 1 },
    { name: "BattleshipHull", x: 1, y: 1 },
    { name: "BattleshipHull", x: 2, y: 1 },
    { name: "MachineGun", x: 0, y: 1 },
    { name: "HomingMissileLauncher", x: 2, y: 1 },
    { name: "FighterLauncher", x: 2, y: 0 },
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
