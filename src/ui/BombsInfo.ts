import { Colors } from "wglt";
import Drawable from "@app/types/Drawable";
import Engine from "@app/Engine";
import { Player } from "@app/components";
import { getPrefab } from "@app/prefabs";

export default class BombsInfo implements Drawable {
  width: number;
  height: number;
  lines: string[];

  constructor(public g: Engine, public player: Player) {
    this.lines = player.bombs.map(
      (prefabName) => getPrefab(prefabName).components!.turret!.name
    );

    this.width = this.lines.reduce((a, b) => Math.max(a, b.length), 0);
    this.height = this.lines.length;
  }

  draw(x: number, y: number): void {
    for (const line of this.lines)
      this.g.term.drawString(x, y++, line, Colors.WHITE);
  }
}
