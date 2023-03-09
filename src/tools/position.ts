import { Position } from "@app/components";
import int from "@app/tools/int";

export const pos = (x: number, y: number): Position => ({ x, y });

export function intPosition(position: Position): Position {
  return pos(int(position.x), int(position.y));
}

export function isSameCell(a?: Position, b?: Position): boolean {
  if (typeof a === "undefined" || typeof b === "undefined") return false;

  const ia = intPosition(a);
  const ib = intPosition(b);
  return ia.x === ib.x && ia.y === ib.y;
}

export function addPositions(a: Position, b: Position): Position {
  return pos(a.x + b.x, a.y + b.y);
}
