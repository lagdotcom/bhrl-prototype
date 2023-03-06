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
  components: { ai: defaultAI, ship: ship("A", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pilcrow } }),
    tinyGun,
  ],
};

export const ShipB: Prefab = {
  components: { ai: defaultAI, ship: ship("B", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Yen } }),
    tinyGun,
  ],
};

export const ShipC: Prefab = {
  components: { ai: defaultAI, ship: ship("C", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "W" } }), tinyGun],
};

export const ShipD: Prefab = {
  components: { ai: defaultAI, ship: ship("D", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Omega } }),
    tinyGun,
  ],
};

export const ShipE: Prefab = {
  components: { ai: defaultAI, ship: ship("E", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.DownWedge } }),
    tinyGun,
  ],
};

export const ShipF: Prefab = {
  components: { ai: defaultAI, ship: ship("F", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pi } }),
    tinyGun,
  ],
};

export const ShipG: Prefab = {
  components: { ai: defaultAI, ship: ship("G", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "M" } }), tinyGun],
};

export const ShipH: Prefab = {
  components: { ai: defaultAI, ship: ship("H", 0) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Female } }),
    tinyGun,
  ],
};

const droneAI: AI = { idealDistance: 5, firingDistance: 6, speed: 1 };
const droneGun = child("DroneGun", 0, 0);

export const DroneA: Prefab = {
  components: { ai: droneAI, ship: ship("Drone A", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Theta } }),
    droneGun,
  ],
};

export const DroneB: Prefab = {
  components: { ai: droneAI, ship: ship("Drone B", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.SymbolED } }),
    droneGun,
  ],
};

export const DroneC: Prefab = {
  components: { ai: droneAI, ship: ship("Drone C", 1) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Silcrow } }),
    droneGun,
  ],
};

export const CruiseyWing: Prefab = {
  components: { ship: ship("Cruisey Wing", 10, 5) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Not } }),
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.HorizontalDivide } }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.NotFlip } }),
  ],
};

export const Olm: Prefab = {
  components: { ship: ship("Olm", 15, 4) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Cent } }),
    child("Hull", 0, 1, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 0, 2, {
      appearance: { glyph: Glyphs.BoxDownSingleHorizontalDouble },
    }),
  ],
};

export const GoutOFlame: Prefab = {
  components: { ship: ship("Gout-'o-flame", 5, 20) },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pentagon } }),
    child("Hull", 1, 0, {
      appearance: { glyph: Glyphs.BoxVerticalDoubleHorizontalSingle },
    }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.Pentagon } }),
    child("Hull", 1, 1, {
      appearance: { glyph: Glyphs.BoxUpDoubleHorizontalSingle },
    }),
  ],
};

export const Demigod: Prefab = {
  components: { ship: ship("Demigod", 30, 15) },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.CapitalUUmlaut } }),
    child("Hull", 0, 1, { appearance: { glyph: "}" } }),
    child("Hull", 1, 1, { appearance: { glyph: Glyphs.RingInvert } }),
    child("Hull", 2, 1, { appearance: { glyph: "{" } }),
    child("Hull", 1, 2, { appearance: { glyph: "Y" } }),
  ],
};
