import { Colors } from "wglt";
import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { child } from "@app/prefabs/tools";

export const Hull: Prefab = {
  components: {
    solid: true,
    appearance: { glyph: "#", layer: Layer.Ship, fg: Colors.DARK_GRAY },
  },
};

export const ShipA: Prefab = {
  components: { ship: { name: "A", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pilcrow } })],
};

export const ShipB: Prefab = {
  components: { ship: { name: "B", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Yen } })],
};

export const ShipC: Prefab = {
  components: { ship: { name: "C", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: "W" } })],
};

export const ShipD: Prefab = {
  components: { ship: { name: "D", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Omega } })],
};

export const ShipE: Prefab = {
  components: { ship: { name: "E", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.DownWedge } })],
};

export const ShipF: Prefab = {
  components: { ship: { name: "F", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Pi } })],
};

export const ShipG: Prefab = {
  components: { ship: { name: "G", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: "M" } })],
};

export const ShipH: Prefab = {
  components: { ship: { name: "H", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Female } })],
};

export const DroneA: Prefab = {
  components: { ship: { name: "Drone A", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Theta } })],
};

export const DroneB: Prefab = {
  components: { ship: { name: "Drone B", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.SymbolED } })],
};

export const DroneC: Prefab = {
  components: { ship: { name: "Drone C", hp: 1, maxHp: 1 } },
  children: [child("Hull", 0, 0, { appearance: { glyph: Glyphs.Silcrow } })],
};

export const CruiseyWing: Prefab = {
  components: { ship: { name: "Cruisey Wing", hp: 1, maxHp: 1 } },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Not } }),
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.HorizontalDivide } }),
    child("Hull", 2, 0, { appearance: { glyph: Glyphs.NotFlip } }),
  ],
};

export const Olm: Prefab = {
  components: { ship: { name: "Olm", hp: 1, maxHp: 1 } },
  children: [
    child("Hull", 0, 0, { appearance: { glyph: Glyphs.Cent } }),
    child("Hull", 0, 1, { appearance: { glyph: Glyphs.ResizeVertical } }),
    child("Hull", 0, 2, {
      appearance: { glyph: Glyphs.BoxDownSingleHorizontalDouble },
    }),
  ],
};

export const GoutOFlame: Prefab = {
  components: { ship: { name: "Gout-'o-flame", hp: 1, maxHp: 1 } },
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
  components: { ship: { name: "Demigod", hp: 1, maxHp: 1 } },
  children: [
    child("Hull", 1, 0, { appearance: { glyph: Glyphs.CapitalUUmlaut } }),
    child("Hull", 0, 1, { appearance: { glyph: "}" } }),
    child("Hull", 1, 1, { appearance: { glyph: Glyphs.RingInvert } }),
    child("Hull", 2, 1, { appearance: { glyph: "{" } }),
    child("Hull", 1, 2, { appearance: { glyph: "Y" } }),
  ],
};
