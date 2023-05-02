import Engine from "@app/Engine";
import Angles from "@app/logic/angles";
import {
  getEntityBlockers,
  getEntityMidpoint,
  getEntityTree,
  getEntityTreeIDs,
  hasComponents,
} from "@app/logic/entity";
import { canFire, fire, getNearestEnemy } from "@app/logic/turret";
import { getPrefab } from "@app/prefabs";
import { angleBetween } from "@app/tools/angle";
import { clone } from "@app/tools/object";
import { addPositions, pos } from "@app/tools/position";

export default function addPlayer(g: Engine) {
  g.on("playerMove", function MovePlayer({ move }) {
    const pe = g.player;
    const position = pe.position;
    const destination = addPositions(position, move);
    const blockers = getEntityBlockers(g, pe, destination);
    if (!blockers.length) {
      pe.move(destination.x, destination.y);
      pe.setLastMovement({ angle: angleBetween(position, destination) });
      g.tick();
    }
  });

  g.on("playerFire", function FirePlayerWeapons({ array }) {
    const pe = g.player;
    const tag = pe.player.weaponArrays[array];

    const tree = getEntityTree(g, pe);
    const weapons = tree.filter((e) => e.tags.has(tag));
    let fired = false;
    for (const weapon of weapons) {
      if (!weapon.position || !weapon.turret) continue;

      if (canFire(weapon.turret)) {
        fire(
          g,
          weapon.turret,
          weapon.position,
          pos(0, 0),
          pe,
          tree.map((e) => e.id)
        );
        fired = true;
      }
    }

    if (fired) {
      pe.setLastMovement();
      g.tick();
    }
  });

  g.on("playerBomb", function FirePlayerBomb() {
    const pe = g.player;
    const prefab = pe.player.bombs.shift();
    if (!prefab) return;

    const bomb = getPrefab(prefab);

    if (bomb.components?.turret) {
      const turret = clone(bomb.components.turret);
      const position = getEntityMidpoint(g, pe);
      const enemy = getNearestEnemy(g, pe);
      const target = enemy ? getEntityMidpoint(g, enemy) : pos(0, 0);

      const created = fire(
        g,
        turret,
        position,
        target,
        pe,
        getEntityTreeIDs(g, pe)
      );
      for (const be of created) {
        // TODO replace with option
        if (hasComponents(be, ["ai", "ship"])) {
          be.ai.attacking = enemy;
          be.ship.firingDirection = Angles.Up;
        }

        if (be.homing) be.homing.target = enemy;
      }

      pe.setLastMovement();
      g.tick();
    }
  });
}
