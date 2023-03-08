import { ship, turret } from "@app/prefabs/tools";

import Angles from "@app/logic/angles";
import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const FighterLauncher: Prefab = {
  components: {
    appearance: { glyph: "_", layer: Layer.Gun, fg: Colors.DARK_CYAN },
    turret: turret("Fighter Bay", { salvoCount: 1, timeBetweenSalvos: 20 }, [
      { prefab: "Fighter", angle: Angles.Down, vel: 0 },
    ]),
  },
};

export const Fighter: Prefab = {
  components: {
    ai: { idealDistance: 6, speed: 2 },
    ship: ship("Fighter", 2),
  },
  children: [
    {
      name: "FighterHull",
      x: 0,
      y: 0,
      overlay: { appearance: { glyph: "<" } },
    },
    { name: "FighterHull", x: 1, y: 0 },
    {
      name: "FighterHull",
      x: 2,
      y: 0,
      overlay: { appearance: { glyph: ">" } },
    },
    { name: "PeaShooter", x: 1, y: 0 },
  ],
};

export const FighterHull: Prefab = {
  components: {
    solid: true,
    appearance: {
      glyph: "-",
      layer: Layer.Ship,
      fg: Colors.YELLOW,
      bg: Colors.DARK_BLUE,
    },
  },
};
