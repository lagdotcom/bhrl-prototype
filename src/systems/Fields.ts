import Engine from "@app/Engine";
import Query from "@app/Query";
import { getEntityLayout } from "@app/logic/entity";
import { getFieldAppearance } from "@app/logic/field";
import { isSameCell } from "@app/tools/position";

export default function addFields(g: Engine) {
  const hulls = new Query(g.entities, ["hull"]);
  const query = new Query(g.entities, ["field", "position"]);
  g.on("tick", () =>
    query.forEach(({ field, position }, e) => {
      field.intensity -= field.falloff;
      e.setAppearance(getFieldAppearance(field));

      if (field.intensity <= 0) g.kill(e);
      else
        hulls.forEach(({}, victim) => {
          const { layout } = getEntityLayout(g, victim);
          const hit = layout.find(({ absolute }) =>
            isSameCell(absolute, position)
          );
          if (hit) g.damage(victim, field.intensity, e);
        });
    })
  );
  g.on("spawn", ({ e }) => {
    if (e.field) e.setAppearance(getFieldAppearance(e.field));
  });
}
