import { Colors } from "wglt";
import Drawable from "@app/types/Drawable";
import Engine from "@app/Engine";
import { Ship } from "@app/components";
import { drawBar } from "@app/logic/graphics";

export default class ShipInfo implements Drawable {
  width: number;
  height: number;

  constructor(public g: Engine, public ship: Ship) {
    this.width = Math.max(13, ship.name.length);
    this.height = ship.maxShield ? 3 : 2;
  }

  draw(x: number, y: number) {
    const { ship, width } = this;
    const { term } = this.g;

    const barLength = width - 3;

    term.drawString(x, y, ship.name, Colors.WHITE);

    term.drawString(x, y + 1, "HP:", Colors.WHITE);
    drawBar(
      term,
      x + 3,
      y + 1,
      barLength,
      ship.hp,
      ship.maxHp,
      Colors.DARK_GREEN,
      Colors.DARK_RED,
      Colors.WHITE
    );

    if (ship.maxShield) {
      term.drawString(x, y + 2, "Sh:", Colors.WHITE);
      drawBar(
        term,
        x + 3,
        y + 2,
        barLength,
        ship.shield,
        ship.maxShield,
        Colors.DARK_CYAN,
        Colors.LIGHT_BLUE,
        Colors.WHITE
      );
    }
  }
}
