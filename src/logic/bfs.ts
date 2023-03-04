import HashMap from "@app/HashMap";
import { Position } from "@app/components";
import neighbours from "@app/logic/neighbours";

export default function bfs(
  start: Position[],
  isPassable: (pos: Position) => boolean,
  maximum = Infinity
) {
  const frontier: Position[] = [];
  const costs = new HashMap<Position, number>((p) => `${p.x},${p.y}`);

  for (const location of start) {
    frontier.push(location);
    costs.set(location, 0);
  }

  while (frontier.length) {
    const current = frontier.shift()!;

    const neighbourCost = costs.getOrDie(current) + 1;
    if (neighbourCost > maximum) continue;

    for (const neighbour of neighbours(current)) {
      if (!costs.has(neighbour) && isPassable(neighbour)) {
        costs.set(neighbour, neighbourCost);
        frontier.push(neighbour);
      }
    }
  }

  return costs;
}
