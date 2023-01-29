import Engine from "@app/Engine";
import System from "@app/System";
import getFieldAppearance from "@app/logic/getFieldAppearance";

export default function getFields(g: Engine) {
  return new System(g, ["field", "position"], ({ field, position }, e) => {
    field.intensity -= field.falloff;
    e.setAppearance(getFieldAppearance(field));

    if (field.intensity <= 0) e.kill();
    else {
      // TODO damage etc.
    }
  });
}
