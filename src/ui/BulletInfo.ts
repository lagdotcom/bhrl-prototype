import { Colors } from "wglt";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import Glyphs from "@app/logic/glyphs";
import InstructionBasedDrawable from "./InstructionBasedDrawable";
import { angleWrap } from "@app/tools/angle";

const circleEighth = Math.PI / 4;
const directions = [
  Glyphs.RightArrow,
  Glyphs.DownArrow + Glyphs.RightArrow,
  Glyphs.DownArrow,
  Glyphs.DownArrow + Glyphs.LeftArrow,
  Glyphs.LeftArrow,
  Glyphs.UpArrow + Glyphs.LeftArrow,
  Glyphs.UpArrow,
  Glyphs.UpArrow + Glyphs.RightArrow,
];
function getDirection(ang: number) {
  const octant = Math.floor(angleWrap(ang) / circleEighth + circleEighth / 2);
  return directions[octant];
}

export default class BulletInfo extends InstructionBasedDrawable {
  constructor(g: Engine, public e: Entity) {
    super(g);

    this.instructions = [];

    if (e.name) this.addLine(e.name);
    if (e.projectile)
      this.addLine(`${e.projectile.damage} damage`, Colors.LIGHT_RED);
    if (e.motion)
      this.addLine(
        `${getDirection(e.motion.angle)}, vel ${e.motion.vel}`,
        Colors.LIGHT_GRAY
      );
    if (e.homing)
      this.addLine(
        `chasing ${e.homing.target === this.g.player ? "you " : ""}${
          e.homing.duration < Infinity ? `(${e.homing.duration})` : ""
        }`,
        Colors.DARK_RED
      );
    if (e.lifetime)
      this.addLine(`(lasts ${e.lifetime.duration})`, Colors.DARK_GRAY);
  }
}
