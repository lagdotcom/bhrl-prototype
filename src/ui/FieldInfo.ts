import { Field } from "@app/components";
import Engine from "@app/Engine";
import InstructionBasedDrawable from "@app/ui/InstructionBasedDrawable";
import { Colors } from "wglt";

export default class FieldInfo extends InstructionBasedDrawable {
  constructor(g: Engine, public field: Field) {
    super(g);

    this.addLine("Explosion");
    this.add({ x: 0, y: 1, fg: Colors.LIGHT_GRAY, line: "intensity" });
    this.add({
      x: 10,
      y: 1,
      fg: Colors.YELLOW,
      line: Math.floor(field.intensity).toString(),
    });
  }
}
