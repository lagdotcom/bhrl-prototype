import { child, ship } from "@app/prefabs/tools";

import { AI } from "@app/components";
import { Colors } from "wglt";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const Hull: Prefab = {
  components: {
    solid: true,
    appearance: { glyph: "#", layer: Layer.Ship, fg: Colors.DARK_GRAY },
  },
};

const defaultAI: AI = { idealDistance: 8, firingDistance: 14, speed: 1 };
const tinyGun = child("PeaShooter", 0, 0);

export const ShipA: Prefab = {
  components: { ai: defaultAI, ship: ship("Axle", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pilcrow } }),
    tinyGun,
  ],
};

export const ShipB: Prefab = {
  components: { ai: defaultAI, ship: ship("Baying Hound", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Yen } }),
    tinyGun,
  ],
};

export const ShipC: Prefab = {
  components: { ai: defaultAI, ship: ship("Caustic", "Escort", 2) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "W" } }), tinyGun],
};

export const ShipD: Prefab = {
  components: { ai: defaultAI, ship: ship("Defiant", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Omega } }),
    tinyGun,
  ],
};

export const ShipE: Prefab = {
  components: { ai: defaultAI, ship: ship("Executor", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.DownWedge } }),
    tinyGun,
  ],
};

export const ShipF: Prefab = {
  components: { ai: defaultAI, ship: ship("Falcon", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pi } }),
    tinyGun,
  ],
};

export const ShipG: Prefab = {
  components: { ai: defaultAI, ship: ship("Gauntlet", "Escort", 2) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "M" } }), tinyGun],
};

export const ShipH: Prefab = {
  components: { ai: defaultAI, ship: ship("Halo", "Escort", 2) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Female } }),
    tinyGun,
  ],
};

const droneAI: AI = { idealDistance: 5, firingDistance: 6, speed: 1 };
const droneGun = child("DroneGun", 0, 0);

export const DroneA: Prefab = {
  components: { ai: droneAI, ship: ship("Runabout", "Escort", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Theta } }),
    droneGun,
  ],
};

export const DroneB: Prefab = {
  components: { ai: droneAI, ship: ship("Wasp", "Escort", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.SymbolED } }),
    droneGun,
  ],
};

export const DroneC: Prefab = {
  components: { ai: droneAI, ship: ship("Pulsar", "Escort", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Silcrow } }),
    droneGun,
  ],
};

export const CruiseyWing: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Cruisey Wing", "Battleship", 10, 5),
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Not } }),
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.HorizontalDivide } }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.NotFlip } }),

    child("PeaShooter", 0, 0),
    child("PeaShooter", 1, 0),
    child("PeaShooter", 2, 0),
  ],
};

export const Olm: Prefab = {
  components: { ai: defaultAI, ship: ship("Olm", "Battleship", 15, 4) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Cent } }),
    child("Hull", 0, 1, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 0, 2, {
      appearance: { glyph: Glyphs.BoxDownSingleHorizontalDouble },
    }),
    child("OlmSpray", 0, 0),
  ],
};

export const GoutOFlame: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Gout-'o-flame", "Battleship", 5, 20),
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pentagon } }),
    child("Hull", 1, 0, {
      appearance: { glyph: Glyphs.BoxVerticalDoubleHorizontalSingle },
    }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.Pentagon } }),
    child("Hull", 1, 1, {
      appearance: { glyph: Glyphs.BoxUpDoubleHorizontalSingle },
    }),

    child("PeaShooter", 1, 1),
  ],
};

export const Demigod: Prefab = {
  components: { ai: defaultAI, ship: ship("Demigod", "Battleship", 30, 15) },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.CapitalUUmlaut } }),
    child("Hull", 0, 1, { appearance: { glyph: "}" } }),
    child("Hull", 1, 1, { appearance: { glyph: Glyphs.RingInvert } }),
    child("Hull", 2, 1, { appearance: { glyph: "{" } }),
    child("Hull", 1, 2, { appearance: { glyph: "Y" } }),

    child("PeaShooter", 1, 2),
  ],
};

export const Gremlin: Prefab = {
  components: { ai: defaultAI, ship: ship("Gremlin", "Battleship", 30, 15) },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 0, 1, { appearance: { glyph: "]" } }),
    child("Hull", 1, 1, {
      appearance: { glyph: Glyphs.BoxLeftSingleUpDouble },
    }),
    child("Hull", 2, 1, {
      appearance: { glyph: Glyphs.BoxRightSingleUpDouble },
    }),
    child("Hull", 3, 1, { appearance: { glyph: Glyphs.Male } }),
    child("Hull", 1, 2, { appearance: { glyph: Glyphs.BoxVerticalSingle } }),
    child("Hull", 2, 2, { appearance: { glyph: Glyphs.Gamma } }),

    child("PeaShooter", 1, 2),
    child("PeaShooter", 2, 2),
  ],
};

export const AtomSmasher: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Atom Smasher", "Battleship", 10, 20),
  },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.EHat } }),
    child("Hull", 2, 0, { appearance: { glyph: "-" } }),
    child("Hull", 3, 0, { appearance: { glyph: Glyphs.AHat } }),
    child("Hull", 0, 1, { appearance: { glyph: Glyphs.Fill2 } }),
    child("Hull", 1, 1, { appearance: { glyph: Glyphs.Fill1 } }),
    child("Hull", 2, 1, { appearance: { glyph: Glyphs.Fill2 } }),
    child("Hull", 3, 1, { appearance: { glyph: Glyphs.Fill3 } }),
    child("Hull", 4, 1, { appearance: { glyph: Glyphs.Filled } }),

    child("PeaShooter", 0, 1),
    child("PeaShooter", 1, 1),
    child("PeaShooter", 2, 1),
    child("PeaShooter", 3, 1),
    child("PeaShooter", 4, 1),
  ],
};
