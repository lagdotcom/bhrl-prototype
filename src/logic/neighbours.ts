import { Position } from "@app/components";
import { addPositions } from "@app/tools/position";

export const neighbourOffsets: Position[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
];

export default function neighbours(pos: Position): Position[] {
  return neighbourOffsets.map((o) => addPositions(pos, o));
}
