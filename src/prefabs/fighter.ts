import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { makeTurret } from "@app/components";
import { ship } from "@app/prefabs/tools";

export const FighterLauncher: Prefab = {
  components: {
    appearance: { glyph: "_", layer: Layer.Gun, fg: Colors.DARK_CYAN },
    turret: makeTurret("Fighter Bay", "nearestEnemy", {
      bulletPrefab: "Fighter",
      bulletVelocity: 0,
      salvoCount: 1,
      timeBetweenSalvos: 20,
    }),
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
