import Engine from "@app/Engine";
import { addPositions } from "@app/tools/position";
import { getEntityBlockers } from "@app/logic/entity";

export default function addPlayer(g: Engine) {
  g.on("playerMove", ({ move }) => {
    const player = g.player;
    const destination = addPositions(player.position!, move);
    const blockers = getEntityBlockers(g, player, destination);
    if (!blockers.length) {
      player.move(destination.x, destination.y);
      g.fovRecompute = true;
      g.tick();
    }
  });
}
