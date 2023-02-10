import { addPositions, intPosition } from "@app/tools/position";
import {
  getEntityLayout,
  getEntityTree,
  getEntityTreeIDs,
  getLayoutBlockers,
} from "@app/logic/entity";

import Engine from "@app/Engine";
import { Position } from "@app/components";
import Query from "@app/Query";
import bfs from "@app/logic/bfs";
import isDefined from "@app/tools/isDefined";
import { neighbourOffsets } from "@app/logic/neighbours";
import oneOf from "@app/tools/oneOf";

export default function addAI(g: Engine) {
  const query = new Query(g.entities, ["ai", "position"]);
  g.on("tick", () =>
    query.forEach(({ ai, position: rawPosition }, e) => {
      const ignoreSolid = getEntityTreeIDs(g, e);
      const { layout } = getEntityLayout(g, e);
      const position = intPosition(rawPosition);

      const playerParts = getEntityTree(g, g.player);
      const playerPositions = playerParts
        .map((e) => e.position)
        .filter(isDefined);

      const search = bfs(playerPositions, (pos) => {
        const blockers = getLayoutBlockers(g, layout, pos, ignoreSolid);
        return blockers.length === 0;
      });

      const getPosScore = (pos: Position) =>
        Math.abs(search.getOrDefault(pos, Infinity) - ai.idealDistance);

      const getScore = (pos: Position) =>
        layout.reduce((a, [b]) => a + getPosScore(addPositions(pos, b)), 0) /
        layout.length;

      let bestScore = getScore(position);
      g.saveOverlay(e, "AI", search);

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
}
