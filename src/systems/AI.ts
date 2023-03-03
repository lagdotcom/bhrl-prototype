import { addPositions, intPosition } from "@app/tools/position";
import { getEntityLayout, getEntityTreeIDs } from "@app/logic/entity";

import Engine from "@app/Engine";
import { Position } from "@app/components";
import Query from "@app/Query";
import distance from "@app/tools/distance";
import { neighbourOffsets } from "@app/logic/neighbours";
import oneOf from "@app/tools/oneOf";

export default function addAI(g: Engine) {
  const query = new Query(g.entities, ["ai", "position"]);
  g.on("tick", () =>
    query.forEach(({ ai, position: rawPosition }, e) => {
      if (!ai.attacking) {
        if (distance(rawPosition, g.player.position!) >= ai.visionRange) return;

        ai.attacking = g.player;
        g.fire("notice", { e, noticed: g.player });
      }

      const ignoreSolid = getEntityTreeIDs(g, e);
      const { layout } = getEntityLayout(g, e);
      const position = intPosition(rawPosition);

      const search = g.getDistanceMap(ai.attacking);

      const isPassable = (pos: Position) => {
        const { solid, wall } = g.getContents(pos, ignoreSolid);
        return !solid && !wall;
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
        return;
      }
    })
  );

  g.on("damage", ({ e, inflicter }) => {
    if (e === inflicter) return;

    if (e.ai) {
      if (!e.ai.attacking) {
        const root = g.getRoot(inflicter);
        if (root.alive) e.ai.attacking = root;
      }
    }
  });
}
