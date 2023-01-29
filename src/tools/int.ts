import { Position } from "@app/components";

export default function int(n?: number) {
  return typeof n === "undefined" ? NaN : Math.floor(n);
}

export function intPosition(pos: Position): Position {
  return { x: int(pos.x), y: int(pos.y) };
}

export function isSameCell(a: Position, b: Position): boolean {
  const ia = intPosition(a);
  const ib = intPosition(b);
  return ia.x === ib.x && ia.y === ib.y;
}
