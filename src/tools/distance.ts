import { Position } from "@app/components";

export default function distance(a: Position, b: Position) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return Math.sqrt(dx * dx + dy * dy);
}
