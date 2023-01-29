import Engine from "@app/Engine";
import System from "@app/System";
import int from "@app/tools/int";

export default function getDrawEntities(g: Engine) {
  return new System(g, ["appearance", "position"], ({ appearance, position }) =>
    g.drawAt(
      int(position.x),
      int(position.y),
      appearance.glyph,
      appearance.fg,
      appearance.bg,
      appearance.blendMode
    )
  );
}
