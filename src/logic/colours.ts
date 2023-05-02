import { Appearance } from "@app/components";
import ShipPower from "@app/types/ShipPower";
import { Colors } from "wglt";

export const StatColours = [
  0,
  Colors.DARK_RED,
  Colors.BROWN,
  Colors.LIGHT_RED,
  Colors.ORANGE,
  Colors.YELLOW,
  Colors.WHITE,
];

export const PowerAppearancePatch: Record<ShipPower, Partial<Appearance>> = {
  Typical: { fg: Colors.DARK_GRAY },
  Healthy: { fg: Colors.DARK_GREEN },
  Double: { fg: Colors.LIGHT_GRAY },
  Multi: { fg: Colors.DARK_MAGENTA },

  Drain: { fg: Colors.DARK_RED },
  StarPilot: { fg: Colors.YELLOW },
  Mega: { fg: Colors.BLACK, bg: Colors.DARK_MAGENTA },
};
