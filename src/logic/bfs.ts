import { Position } from "@app/components";
import HashMap from "@app/HashMap";
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

  let current = frontier.shift();
  while (current) {
    const neighbourCost = costs.getOrDie(current) + 1;
    if (neighbourCost <= maximum)
      for (const neighbour of neighbours(current)) {
        if (!costs.has(neighbour) && isPassable(neighbour)) {
          costs.set(neighbour, neighbourCost);
          frontier.push(neighbour);
        }
      }

    current = frontier.shift();
  }

  return costs;
}
