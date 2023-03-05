import { Terminal } from "wglt";

export function drawBar(
  term: Terminal,
  x: number,
  y: number,
  width: number,
  val: number,
  max: number,
  filledBg: number,
  emptyBg: number,
  textFg: number
) {
  const label = `${Math.ceil(val)}/${max}`;
  const length = Math.floor((val / max) * width);

  term.drawHLine(x, y, width, " ", undefined, emptyBg);
  if (length) term.drawHLine(x, y, length, " ", undefined, filledBg);
  term.drawCenteredString(x + width / 2, y, label, textFg);
}
