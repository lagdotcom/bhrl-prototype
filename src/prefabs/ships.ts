import { child, ship } from "@app/prefabs/tools";

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

export const ShipA: Prefab = {
  components: { ship: ship("A", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pilcrow } })],
};

export const ShipB: Prefab = {
  components: { ship: ship("B", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Yen } })],
};

export const ShipC: Prefab = {
  components: { ship: ship("C", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "W" } })],
};

export const ShipD: Prefab = {
  components: { ship: ship("D", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Omega } })],
};

export const ShipE: Prefab = {
  components: { ship: ship("E", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.DownWedge } })],
};

export const ShipF: Prefab = {
  components: { ship: ship("F", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pi } })],
};

export const ShipG: Prefab = {
  components: { ship: ship("G", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: "M" } })],
};

export const ShipH: Prefab = {
  components: { ship: ship("H", 0) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Female } })],
};

export const DroneA: Prefab = {
  components: { ship: ship("Drone A", 1) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Theta } })],
};

export const DroneB: Prefab = {
  components: { ship: ship("Drone B", 1) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.SymbolED } })],
};

export const DroneC: Prefab = {
  components: { ship: ship("Drone C", 1) },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Silcrow } })],
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
