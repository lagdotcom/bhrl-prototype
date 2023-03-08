import { Colors } from "wglt";
import Engine from "@app/Engine";
import Glyphs from "@app/logic/glyphs";
import InstructionBasedDrawable from "./InstructionBasedDrawable";
import { Item } from "@app/components";
import { PowerAppearancePatch } from "@app/logic/colours";

export default class ItemInfo extends InstructionBasedDrawable {
  constructor(g: Engine, public item: Item) {
    super(g);

    switch (item.type) {
      case "bomb":
        this.addLine("Smart Bomb");
        break;

      case "double":
        this.addLine(
          "Double",
          PowerAppearancePatch.Double.fg,
          PowerAppearancePatch.Double.bg
        );
        break;

      case "drain":
        this.addLine(
          "Drain",
          PowerAppearancePatch.Drain.fg,
          PowerAppearancePatch.Drain.bg
        );
        break;

      case "heal":
        this.addLine(
          "Heal",
          PowerAppearancePatch.Healthy.fg,
          PowerAppearancePatch.Healthy.bg
        );
        break;

      case "junk":
        this.addLine("Junk", Colors.DARK_GRAY);
        break;

      case "money":
        this.addLine(`${Glyphs.SetMember}${item.value}`, Colors.YELLOW);
        break;

      case "recharge":
        this.addLine("Recharge");
        break;
    }
  }
}
