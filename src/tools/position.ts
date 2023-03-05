import { Position } from "@app/components";
import int from "@app/tools/int";

export function intPosition(pos: Position): Position {
  return { x: int(pos.x), y: int(pos.y) };
}

export function isSameCell(a?: Position, b?: Position): boolean {
  if (typeof a === "undefined" || typeof b === "undefined") return false;

  const ia = intPosition(a);
  const ib = intPosition(b);
  return ia.x === ib.x && ia.y === ib.y;
}

export function addPositions(a: Position, b: Position): Position {
  return { x: a.x + b.x, y: a.y + b.y };
}
