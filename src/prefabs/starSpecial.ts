import { Colors, fromRgb } from "wglt";
import { array, bullet, turret } from "./tools";

import Angles from "@app/logic/angles";
import Layer from "@app/types/Layer";
import Offsets from "@app/logic/offsets";
import Prefab from "@app/types/Prefab";

export const MultiballShot: Prefab = {
  components: {
    projectile: { damage: 7 },
    appearance: { glyph: "+", layer: Layer.Bullet, fg: fromRgb(255, 255, 55) },
  },
};

export const Multiball: Prefab = {
  components: {
    turret: turret("Multiball", { salvoCount: 1, timeBetweenSalvos: 15 }, [
      bullet("Multiball", "MultiballShot", Angles.DownLeft, 2),
      bullet("Multiball", "MultiballShot", Angles.Left, 2),
      bullet("Multiball", "MultiballShot", Angles.Right, 2),
      bullet("Multiball", "MultiballShot", Angles.DownRight, 2),
      bullet("Runabout", "DroneA", Angles.UpLeft, 0, {
        offset: Offsets.UpLeft,
      }),
      bullet("Runabout", "DroneA", Angles.UpRight, 0, {
        offset: Offsets.UpRight,
      }),
    ]),
  },
};

export const StubbornDescent: Prefab = {
  components: {
    turret: turret(
      "Stubborn Descent",
      { salvoCount: 13, timeBetweenSalvos: 21 },
      [array("Primary")]
      // TODO create escorts??
    ),
  },
};

export const Laser: Prefab = {
  components: {
    projectile: { damage: 2 },
    appearance: {
      glyph: "|",
      layer: Layer.Bullet,
      fg: Colors.WHITE,
      bg: Colors.LIGHT_BLUE,
    },
  },
};

export const LaserBeam: Prefab = {
  components: {
    turret: turret("Laser Beam", { salvoCount: 10, timeBetweenSalvos: 30 }, [
      bullet("Laser", "Laser", Angles.Down, 1, {
        offset: Offsets.Down,
        beam: {
          duration: 1,
          appearance: new Array(60),
        },
      }),
    ]),
  },
};
