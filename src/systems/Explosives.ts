import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { generateField } from "@app/logic/field";

export default function addExplosives(g: Engine) {
  g.on("kill", function CreateExplosion({ e, reason }) {
    if (reason.type === "exitedMap") return;

    const { explodes, name, position } = e;

    if (explodes && position) {
      for (const { x, y, intensity } of generateField(position, explodes.size))
        g.add(
          new Entity(g, name + "Explosion").setPosition({ x, y }).setField({
            type: "fire",
            intensity,
            falloff: explodes.falloff,
          })
        );
    }
  });
}
