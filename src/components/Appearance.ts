import { BlendMode } from "wglt";
import Layer from "@app/Layer";

type Appearance = {
  glyph: string;
  layer: Layer;
  fg?: number;
  bg?: number;
  blendMode?: BlendMode;
};
export default Appearance;
