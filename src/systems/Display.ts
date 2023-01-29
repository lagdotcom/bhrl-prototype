import Engine from "@app/Engine";
import Query from "@app/Query";
import int from "@app/tools/int";

export default function addDisplay(g: Engine) {
  const query = new Query(g.entities, ["appearance", "position"]);
  g.on("draw", () =>
    query.forEach(({ appearance, position }) =>
      g.drawIfVisible(
        int(position.x),
        int(position.y),
        appearance.glyph,
        appearance.fg,
        appearance.bg,
        appearance.blendMode
      )
    )
  );
}
