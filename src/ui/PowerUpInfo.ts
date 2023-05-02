import Engine from "@app/Engine";
import Entity from "@app/Entity";
import InstructionBasedDrawable from "@app/ui/InstructionBasedDrawable";
import { Colors } from "wglt";

export default class PowerUpInfo extends InstructionBasedDrawable {
  constructor(g: Engine, public e: Entity) {
    super(g);

    if (e.doubleShot)
      this.addLine(
        e.doubleShot.duration === Infinity
          ? "2x Shot"
          : `2x Shot (${e.doubleShot.duration})`,
        Colors.LIGHT_GRAY
      );
  }
}
