import { addPositions, intPosition } from "@app/tools/position";
import { getEntityLayout, getEntityTreeIDs } from "@app/logic/entity";

import Engine from "@app/Engine";
import { Position } from "@app/components";
import Query from "@app/Query";
import { angleBetween } from "@app/tools/angle";
import { neighbourOffsets } from "@app/logic/neighbours";
import oneOf from "@app/tools/oneOf";

export default function addAI(g: Engine) {
  const query = new Query(g.entities, ["ai", "position"]);
  g.on("tick", function MoveEnemies() {
    query.forEach(({ ai, position: rawPosition }, e) => {
      e.setLastMovement();

      // TODO something better than this?
      if (!ai.attacking) {
        ai.attacking = g.player;
        g.fire("notice", { e, noticed: g.player });
      }

      const ignoreSolid = getEntityTreeIDs(g, e);
      const { layout } = getEntityLayout(g, e);
      const position = intPosition(rawPosition);

      const search = g.getDistanceMap(ai.attacking);

      const isPassable = (pos: Position) => {
        const { oob, solid, wall } = g.getContents(pos, ignoreSolid);
        return !oob && !solid && !wall;
      };

      const getPosScore = (pos: Position) =>
        isPassable(pos)
          ? Math.abs(search.getOrDefault(pos, Infinity) - ai.idealDistance)
          : Infinity;

      const getScore = (pos: Position) =>
        layout.reduce(
          (a, { offset }) => a + getPosScore(addPositions(pos, offset)),
          0
        ) / layout.length;

      let bestScore = getScore(position);

      let possibilities: Position[] = [];
      for (const offset of neighbourOffsets) {
        const possibility = addPositions(position, offset);
        if (!search.has(possibility)) continue;

        const score = getScore(possibility);
        if (score < bestScore) {
          bestScore = score;
          possibilities = [possibility];
        } else if (score === bestScore) possibilities.push(possibility);
      }

      if (possibilities.length) {
        const destination = oneOf(possibilities);
        e.move(destination.x, destination.y);
        e.setLastMovement({ angle: angleBetween(position, destination) });
        return;
      }
    });
  });

  g.on("damage", function AIReactsTODamage({ e, source }) {
    if (!source.owner) return;
    if (e === source.owner) return;

    if (e.ai && !e.ai.attacking && source.owner.alive)
      e.ai.attacking = source.owner;
  });
}
