import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { getEntityMidpoint } from "@app/logic/entity";
import { generateField } from "@app/logic/field";

const TryToMergeFields = false;

export default function addExplosives(g: Engine) {
  g.on("kill", function CreateExplosion({ e, reason }) {
    if (reason.type === "exitedMap") return;

    const { explodes, name, position } = e;

    if (explodes && position) {
      for (const { x, y, intensity } of generateField(
        getEntityMidpoint(g, e),
        explodes.size
      )) {
        let handled = false;

        // try to merge with any existing fields
        if (TryToMergeFields) {
          const { other } = g.getContents({ x, y });
          for (const e of other) {
            if (e.field?.type === explodes.type) {
              e.field.intensity += intensity;
              e.field.falloff = Math.max(e.field.falloff, explodes.falloff);
              handled = true;
              break;
            }
          }
        }

        if (!handled)
          g.add(
            new Entity(g, name + "Explosion").setPosition({ x, y }).setField({
              type: explodes.type,
              intensity,
              falloff: explodes.falloff,
            })
          );
      }
    }
  });
}
