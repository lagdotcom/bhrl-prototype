import Layer from "@app/types/Layer";
import { BlendMode } from "wglt";

type Appearance = {
  glyph: string;
  layer: Layer;
  fg?: number;
  bg?: number;
  blendMode?: BlendMode;
};
export default Appearance;
