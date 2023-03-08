import Engine from "@app/Engine";
import Query from "@app/Query";
import damage from "@app/logic/damage";
import { getEntityLayout } from "@app/logic/entity";
import { getFieldAppearance } from "@app/logic/field";
import { isSameCell } from "@app/tools/position";

export default function addFields(g: Engine) {
  const ships = new Query(g.entities, ["ship"]);
  const query = new Query(g.entities, ["field", "position"]);
  g.on("tick", function ApplyFields() {
    query.forEach(({ field, position }, e) => {
      field.intensity -= field.falloff;
      e.setAppearance(getFieldAppearance(field));

      if (field.intensity < 1) g.kill(e, { type: "expired" });
      else
        ships.forEach((_, victim) => {
          const { layout } = getEntityLayout(g, victim);
          const hit = layout.find(({ absolute }) =>
            isSameCell(absolute, position)
          );
          if (hit) damage(g, victim, Math.floor(field.intensity), e);
        });
    });
  });
  g.on("spawn", function InitialiseField({ e }) {
    if (e.field) e.setAppearance(getFieldAppearance(e.field));
  });
}
