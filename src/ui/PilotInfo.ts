import { Pilot } from "@app/components";
import Engine from "@app/Engine";
import { StatColours } from "@app/logic/colours";
import Drawable from "@app/types/Drawable";
import PilotStat from "@app/types/PilotStat";
import { Colors } from "wglt";

export default class PilotInfo implements Drawable {
  width: number;
  height: number;

  constructor(public g: Engine, public pilot: Pilot, public full: boolean) {
    this.width = 11;
    this.height = full ? 2 + pilot.class.length : 1;
  }

  get isPlayer() {
    return this.pilot.player;
  }

  draw(x: number, y: number) {
    if (this.full) {
      this.g.term.drawString(
        x,
        y,
        this.pilot.name,
        this.pilot.star ? Colors.YELLOW : Colors.LIGHT_GRAY
      );
      y++;
    }

    this.drawStat(x, y, "body");
    this.drawStat(x + 3, y, "mind");
    this.drawStat(x + 6, y, "spirit");
    this.drawStat(x + 9, y, "talent");

    if (!this.full) return;

    for (const cl of this.pilot.class)
      this.g.term.drawString(x, ++y, cl, Colors.LIGHT_GREEN);
  }

  drawStat(x: number, y: number, stat: PilotStat) {
    const value = this.pilot[stat];
    this.g.term.drawChar(x, y, stat[0].toUpperCase(), Colors.WHITE);
    this.g.term.drawChar(x + 1, y, value.toString(), StatColours[value]);
  }
}
