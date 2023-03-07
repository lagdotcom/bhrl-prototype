import { canFire, fire } from "@app/logic/turret";
import { getEntityBlockers, getEntityTree } from "@app/logic/entity";

import Engine from "@app/Engine";
import { addPositions } from "@app/tools/position";
import { angleBetween } from "@app/tools/angle";

export default function addPlayer(g: Engine) {
  g.on("playerMove", function MovePlayer({ move }) {
    const player = g.player;
    const position = player.position!;
    const destination = addPositions(position, move);
    const blockers = getEntityBlockers(g, player, destination);
    if (!blockers.length) {
      player.move(destination.x, destination.y);
      player.setLastMovement({ angle: angleBetween(position, destination) });
      g.tick();
    }
  });

  g.on("playerFire", function FirePlayerWeapons({ array }) {
    const player = g.player;
    const tag = player.player!.weaponArrays[array];

    const tree = getEntityTree(g, player);
    const weapons = tree.filter((e) => e.tags.has(tag));
    let fired = false;
    for (const weapon of weapons) {
      if (!weapon.turret) continue;

      if (canFire(weapon.turret, player)) {
        fire(
          g,
          weapon.turret,
          weapon.position!,
          { x: 0, y: 0 },
          player,
          tree.map((e) => e.id)
        );
        fired = true;
      }
    }

    if (fired) {
      player.setLastMovement();
      g.tick();
    }
  });
}
