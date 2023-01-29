import Engine from "@app/Engine";
import Query from "@app/Query";
import int from "@app/tools/int";

export default function addDrawEntities(g: Engine) {
  const query = new Query(g.entities, ["appearance", "position"]);
  g.on("draw", () =>
    query.forEach(({ appearance, position }) =>
      g.drawAt(
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
