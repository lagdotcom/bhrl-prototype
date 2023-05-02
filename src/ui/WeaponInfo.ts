import { Turret } from "@app/components";
import Engine from "@app/Engine";
import { getState } from "@app/logic/turret";
import Drawable from "@app/types/Drawable";
import { Colors } from "wglt";

const StateColours = {
  Spent: Colors.DARK_GRAY,
  Reloading: Colors.LIGHT_RED,
  Ready: Colors.YELLOW,
  Chambering: Colors.BROWN,
};

export default class WeaponInfo implements Drawable {
  width: number;
  height: number;

  constructor(public g: Engine, public turret: Turret) {
    this.width = Math.max(turret.name.length, this.stateLabel.length);
    this.height = 2;

    if (turret.ammunition > 0 && turret.ammunition < Infinity) this.height++;
  }

  get stateLabel() {
    const { timer, salvo, salvoCount } = this.turret;

    const state = getState(this.turret);
    if (state === "Spent") return "Out of Ammo";
    if (state === "Reloading") return `Reloading (${timer})`;

    const ammo = `${salvo}/${salvoCount}`;
    return state === "Ready" ? ammo : `${ammo} (${timer})`;
  }

  draw(x: number, y: number) {
    this.g.term.drawString(x, y, this.turret.name, Colors.WHITE);

    const state = getState(this.turret);
    this.g.term.drawString(x, y + 1, this.stateLabel, StateColours[state]);

    if (this.height > 2)
      this.g.term.drawString(
        x,
        y + 2,
        `${this.turret.ammunition} ammo left`,
        Colors.LIGHT_GRAY
      );
  }
}
