import Drawable from "@app/types/Drawable";
import Engine from "@app/Engine";

export type LineInstruction = {
  x: number;
  y: number;
  line: string;
  fg: number;
};

export default abstract class InstructionBasedDrawable implements Drawable {
  width: number;
  height: number;
  instructions: LineInstruction[];

  constructor(public g: Engine) {
    this.width = 0;
    this.height = 0;
    this.instructions = [];
  }

  protected add(instruction: LineInstruction) {
    this.instructions.push(instruction);
    this.updateBounds();
  }

  protected addLine(line: string, fg: number) {
    this.add({ x: 0, y: this.instructions.length, line, fg });
  }

  private updateBounds() {
    this.width = this.instructions.reduce(
      (a, b) => Math.max(b.line.length + b.x, a),
      0
    );
    this.height = 1 + this.instructions.reduce((a, b) => Math.max(b.y, a), 0);
  }

  draw(sx: number, sy: number) {
    for (const { x, y, line, fg } of this.instructions)
      this.g.term.drawString(sx + x, sy + y, line, fg);
  }
}
