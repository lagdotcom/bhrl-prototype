import Engine from "@app/Engine";
import Query from "@app/Query";
import getFieldAppearance from "@app/logic/getFieldAppearance";

export default function addFields(g: Engine) {
  const query = new Query(g.entities, ["field", "position"]);
  g.on("tick", () =>
    query.forEach(({ field }, e) => {
      field.intensity -= field.falloff;
      e.setAppearance(getFieldAppearance(field));

      if (field.intensity <= 0) g.delete(e);
      else {
        // TODO damage etc.
      }
    })
  );
  g.on("spawn", ({ e }) => {
    if (e.field) e.setAppearance(getFieldAppearance(e.field));
  });
}
