import { Colors, fromRgb } from "wglt";
import { array, bullet, turret } from "./tools";

import Angles from "@app/logic/angles";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Offsets from "@app/logic/offsets";
import Prefab from "@app/types/Prefab";
import enumerate from "@app/tools/enumerate";

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

export const SwitchbladeBullet: Prefab = {
  components: {
    projectile: { damage: 9 },
    appearance: {
      glyph: Glyphs.ResizeHorizontal,
      layer: Layer.Bullet,
      fg: Colors.LIGHT_BLUE,
    },
  },
};

export const Switchblades: Prefab = {
  components: {
    turret: turret("Switchblades", { salvoCount: 1, timeBetweenSalvos: 11 }, [
      ...enumerate(9).map((delay) =>
        bullet("Switchblade", "SwitchbladeBullet", Angles.DownLeft, 1, {
          delay,
        })
      ),
      ...enumerate(9).map((delay) =>
        bullet("Switchblade", "SwitchbladeBullet", Angles.DownRight, 1, {
          delay,
        })
      ),
    ]),
  },
};

export const TriangulateMissile: Prefab = {
  components: {
    projectile: { damage: 10 },
    homing: { strength: 0.1, duration: Infinity },
    explodes: { type: "Blue", size: 4, falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_CYAN },
  },
};

export const Triangulate: Prefab = {
  components: {
    turret: turret("Triangulate", { salvoCount: 1, timeBetweenSalvos: 17 }, [
      bullet("Triangulate", "TriangulateMissile", Angles.DownLeft, 1),
      bullet("Triangulate", "TriangulateMissile", Angles.Left, 1, {
        delay: 1,
      }),
      bullet("Triangulate", "TriangulateMissile", Angles.UpLeft, 1, {
        delay: 2,
      }),
      bullet("Triangulate", "TriangulateMissile", Angles.Up, 1, {
        delay: 3,
      }),
      bullet("Triangulate", "TriangulateMissile", Angles.UpRight, 1, {
        delay: 4,
      }),
      bullet("Triangulate", "TriangulateMissile", Angles.Right, 1, {
        delay: 5,
      }),
      bullet("Triangulate", "TriangulateMissile", Angles.DownRight, 1, {
        delay: 6,
      }),
    ]),
  },
};

export const OverloadBullet: Prefab = {
  components: {
    projectile: { damage: 7 },
    appearance: {
      glyph: Glyphs.Smiley,
      layer: Layer.Bullet,
      fg: Colors.LIGHT_GRAY,
    },
  },
};

export const Overload: Prefab = {
  components: {
    turret: turret(
      "Overload",
      { salvoCount: 1, timeBetweenSalvos: 20 },
      enumerate(11).map((delay) =>
        bullet("Overload", "OverloadBullet", "random", 2, { delay })
      )
    ),
  },
};
