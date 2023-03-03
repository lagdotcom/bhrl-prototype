import { canFire, fireAt } from "@app/logic/turret";
import { getEntityBlockers, getEntityTree } from "@app/logic/entity";

import Engine from "@app/Engine";
import { addPositions } from "@app/tools/position";

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

  g.on("playerFire", ({ array }) => {
    const player = g.player;
    const tag = player.player!.weaponArrays[array];

    const tree = getEntityTree(g, player);
    const weapons = tree.filter((e) => e.tags.has(tag));
    let fired = false;
    for (const weapon of weapons) {
      if (!weapon.turret) continue;

      const position = weapon.position!;
      const target = addPositions(position, { x: 0.5, y: -0.5 });

      if (canFire(weapon.turret)) {
        fireAt(
          g,
          weapon.turret,
          position,
          target,
          player,
          tree.map((e) => e.id)
        );
        fired = true;
      }
    }
  });
}
