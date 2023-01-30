import { BlendMode, fromRgb } from "wglt";

import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const AirFistRange: Prefab = {
  components: {
    lifetime: { duration: 2 },
    appearance: {
      glyph: " ",
      layer: Layer.Effect,
      bg: fromRgb(0, 255, 255, 100),
      blendMode: BlendMode.Add,
    },
  },
};

export const SmokePuff: Prefab = {
  components: {
    lifetime: { duration: 2 },
    appearance: {
      glyph: " ",
      layer: Layer.Effect,
      bg: fromRgb(100, 100, 100, 50),
      blendMode: BlendMode.Add,
    },
  },
};
