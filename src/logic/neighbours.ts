import { addPositions, pos } from "@app/tools/position";

import { Position } from "@app/components";

export const neighbourOffsets: Position[] = [
  pos(-1, -1),
  pos(-1, 0),
  pos(-1, 1),
  pos(0, 1),
  pos(1, 1),
  pos(1, 0),
  pos(1, -1),
  pos(0, -1),
];

export default function neighbours(pos: Position): Position[] {
  return neighbourOffsets.map((offset) => addPositions(pos, offset));
}
