import Glyphs from "@app/logic/glyphs";
import Offsets from "@app/logic/offsets";
import { array, bullet, rel, rnd, turret } from "@app/prefabs/tools";
import enumerate from "@app/tools/enumerate";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { Colors, fromRgb } from "wglt";

export const MultiballShot: Prefab = {
  components: {
    projectile: { damage: 7 },
    appearance: { glyph: "+", layer: Layer.Bullet, fg: fromRgb(255, 255, 55) },
  },
};

export const Multiball: Prefab = {
  components: {
    turret: turret("Multiball", { salvoCount: 1, timeBetweenSalvos: 15 }, [
      bullet("Multiball", "MultiballShot", rel("FR"), 2),
      bullet("Multiball", "MultiballShot", rel("R"), 2),
      bullet("Multiball", "MultiballShot", rel("L"), 2),
      bullet("Multiball", "MultiballShot", rel("FL"), 2),
      bullet("Runabout", "DroneA", rel("BR"), 0, {
        offset: Offsets.UpLeft,
      }),
      bullet("Runabout", "DroneA", rel("BL"), 0, {
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
      bullet("Laser", "Laser", rel("F"), 1, {
        offset: Offsets.Down,
        beam: { duration: 1, length: 60, appearance: [] },
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
        bullet("Switchblade", "SwitchbladeBullet", rel("FR"), 1, {
          delay,
        })
      ),
      ...enumerate(9).map((delay) =>
        bullet("Switchblade", "SwitchbladeBullet", rel("FL"), 1, {
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
      bullet("Triangulate", "TriangulateMissile", rel("FR"), 1),
      bullet("Triangulate", "TriangulateMissile", rel("R"), 1, {
        delay: 1,
      }),
      bullet("Triangulate", "TriangulateMissile", rel("BR"), 1, {
        delay: 2,
      }),
      bullet("Triangulate", "TriangulateMissile", rel("B"), 1, {
        delay: 3,
      }),
      bullet("Triangulate", "TriangulateMissile", rel("BL"), 1, {
        delay: 4,
      }),
      bullet("Triangulate", "TriangulateMissile", rel("L"), 1, {
        delay: 5,
      }),
      bullet("Triangulate", "TriangulateMissile", rel("FL"), 1, {
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
        bullet("Overload", "OverloadBullet", rnd, 2, { delay })
      )
    ),
  },
};
