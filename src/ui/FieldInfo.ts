import { Colors } from "wglt";
import Engine from "@app/Engine";
import { Field } from "@app/components";
import InstructionBasedDrawable from "./InstructionBasedDrawable";

export default class FieldInfo extends InstructionBasedDrawable {
  constructor(g: Engine, public field: Field) {
    super(g);

    this.addLine(`${field.type} Field`, Colors.WHITE);
    this.add({ x: 0, y: 1, fg: Colors.LIGHT_GRAY, line: "intensity" });
    this.add({
      x: 10,
      y: 1,
      fg: Colors.YELLOW,
      line: Math.floor(field.intensity).toString(),
    });
  }
}
