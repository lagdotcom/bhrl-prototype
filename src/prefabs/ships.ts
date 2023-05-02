import { AI, Explodes } from "@app/components";
import Glyphs from "@app/logic/glyphs";
import { child, ship } from "@app/prefabs/tools";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { Colors } from "wglt";

export const Hull: Prefab = {
  components: {
    solid: true,
    appearance: { glyph: "#", layer: Layer.Ship, fg: Colors.DARK_GRAY },
  },
};

const defaultAI: AI = { idealDistance: 8, firingDistance: 14, speed: 1 };
const escortGun = child("PeaShooter", 0, 0, undefined, ["Primary"]);
const escortExplodes: Explodes = { type: "Fire", size: 4, falloff: 1 };

export const ShipA: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Axle", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pilcrow } }),
    escortGun,
    child("Cleave", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipB: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Baying Hound", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Yen } }),
    escortGun,
    child("Outcry", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipC: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Caustic", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: "W" } }),
    escortGun,
    child("AcidSplash", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipD: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Defiant", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Omega } }),
    escortGun,
    child("ShuttleLaunch", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipE: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Executor", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.DownWedge } }),
    escortGun,
    child("Veto", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipF: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Falcon", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pi } }),
    escortGun,
    child("TalonSwipe", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipG: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Gauntlet", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: "M" } }),
    escortGun,
    child("CrushPattern", 0, 0, undefined, ["Special"]),
  ],
};

export const ShipH: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Halo", "Escort", 2),
    explodes: escortExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Female } }),
    escortGun,
    child("Smite", 0, 0, undefined, ["Special"]),
  ],
};

const droneAI: AI = { idealDistance: 5, firingDistance: 6, speed: 1 };
const droneGun = child("DroneGun", 0, 0, undefined, ["Primary"]);
const droneExplodes: Explodes = { type: "Fire", size: 3, falloff: 1 };

export const DroneA: Prefab = {
  components: {
    ai: droneAI,
    ship: ship("Runabout", "Escort", 1),
    explodes: droneExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Theta } }),
    escortGun,
  ],
};

export const DroneB: Prefab = {
  components: {
    ai: droneAI,
    ship: ship("Wasp", "Escort", 1),
    explodes: droneExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.SymbolED } }),
    // TODO tries to ram you
    droneGun,
  ],
};

export const DroneC: Prefab = {
  components: {
    ai: droneAI,
    ship: ship("Pulsar", "Escort", 1),
    explodes: droneExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Silcrow } }),
    // TODO tries to orbit you and fire homing bullets dir D
    droneGun,
  ],
};

const battleshipExplodes: Explodes = { type: "Fire", size: 6, falloff: 1 };

export const CruiseyWing: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Cruisey Wing", "Battleship", 10, 5),
    explodes: battleshipExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Not } }),
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.HorizontalDivide } }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.NotFlip } }),

    child("PeaShooter", 0, 0, undefined, ["Primary"]),
    child("PeaShooter", 1, 0, undefined, ["Primary"]),
    child("PeaShooter", 2, 0, undefined, ["Primary"]),
    child("Salvo", 1, 0, undefined, ["Special"]),
  ],
};

export const Olm: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Olm", "Battleship", 15, 4),
    explodes: battleshipExplodes,
  },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Cent } }),
    child("Hull", 0, 1, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 0, 2, {
      appearance: { glyph: Glyphs.BoxDownSingleHorizontalDouble },
    }),
    child("PeaShooter", 0, 2, undefined, ["Primary"]),
    child("TheDragonWakes", 0, 0, undefined, ["Special"]),
  ],
};

export const GoutOFlame: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Gout-o'-flame", "Battleship", 5, 20),
    explodes: battleshipExplodes,
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

    child("PeaShooter", 1, 1, undefined, ["Primary"]),
    child("Bellow", 1, 1, undefined, ["Special"]),
  ],
};

export const Demigod: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Demigod", "Battleship", 30, 15),
    explodes: battleshipExplodes,
  },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.CapitalUUmlaut } }),
    child("Hull", 0, 1, { appearance: { glyph: "}" } }),
    child("Hull", 1, 1, { appearance: { glyph: Glyphs.RingInvert } }),
    child("Hull", 2, 1, { appearance: { glyph: "{" } }),
    child("Hull", 1, 2, { appearance: { glyph: "Y" } }),

    child("PeaShooter", 1, 2, undefined, ["Primary"]),
    child("DemandHomage", 1, 1, undefined, ["Special"]),
  ],
};

export const Gremlin: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Gremlin", "Battleship", 30, 15),
    explodes: battleshipExplodes,
  },
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

    child("PeaShooter", 1, 2, undefined, ["Primary"]),
    child("PeaShooter", 2, 2, undefined, ["Primary"]),
  ],
};

export const AtomSmasher: Prefab = {
  components: {
    ai: defaultAI,
    ship: ship("Atom Smasher", "Battleship", 10, 20),
    explodes: battleshipExplodes,
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

    child("PeaShooter", 0, 1, undefined, ["Primary"]),
    child("PeaShooter", 1, 1, undefined, ["Primary"]),
    child("PeaShooter", 2, 1, undefined, ["Primary"]),
    child("PeaShooter", 3, 1, undefined, ["Primary"]),
    child("PeaShooter", 4, 1, undefined, ["Primary"]),
  ],
};
