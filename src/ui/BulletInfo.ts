import { Colors } from "wglt";
import Drawable from "@app/types/Drawable";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { angleWrap } from "@app/tools/angle";

type LineInstruction = { x: number; y: number; line: string; fg: number };

const circleEighth = Math.PI / 4;
function getDirection(ang: number) {
  const octant = Math.floor(angleWrap(ang) / circleEighth + circleEighth / 2);
  return ["E", "SE", "S", "SW", "W", "NW", "N", "NE"][octant];
}

export default class BulletInfo implements Drawable {
  width: number;
  height: number;
  instructions: LineInstruction[];

  constructor(public g: Engine, public e: Entity) {
    this.instructions = [];

    if (e.name) this.add(e.name, Colors.WHITE);
    if (e.projectile)
      this.add(`${e.projectile.damage} damage`, Colors.LIGHT_RED);
    if (e.motion)
      this.add(
        `${getDirection(e.motion.angle)}, vel ${e.motion.vel}`,
        Colors.LIGHT_GRAY
      );
    if (e.homing)
      this.add(
        `chasing ${e.homing.target === this.g.player ? "you " : ""}${
          e.homing.duration < Infinity ? `(${e.homing.duration})` : ""
        }`,
        Colors.DARK_RED
      );

    this.width = this.instructions.reduce(
      (a, b) => Math.max(b.line.length, a),
      0
    );
    this.height = this.instructions.length;
  }

  private add(line: string, fg: number) {
    this.instructions.push({ x: 0, y: this.instructions.length, line, fg });
  }

  draw(sx: number, sy: number) {
    for (const { x, y, line, fg } of this.instructions)
      this.g.term.drawString(sx + x, sy + y, line, fg);
  }
}
