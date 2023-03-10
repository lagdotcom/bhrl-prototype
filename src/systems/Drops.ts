import { addPositions, pos } from "@app/tools/position";

import Angles from "@app/logic/angles";
import EnemyFlags from "@app/types/EnemyFlags";
import Engine from "@app/Engine";
import { PowerToFlags } from "@app/logic/enemy";
import { PrefabName } from "@app/prefabs";
import { getEntityTree } from "@app/logic/entity";
import oneOf from "@app/tools/oneOf";
import shuffle from "@app/tools/shuffle";

export default function addDrops(g: Engine) {
  g.on("kill", function DropItems({ e, reason }) {
    const { position, ship } = e;
    if (position && ship?.power && reason.type === "damage") {
      const flags = PowerToFlags[ship.power];
      const lucky =
        reason.source.e.projectile?.special === "increasedDropChance";

      const chance =
        ship.type === "Battleship"
          ? lucky
            ? 0.92
            : 0.42
          : lucky
          ? 0.32
          : 0.02;
      const roll = (mul = 1) => Math.random() * mul < chance;

      const itemPrefabs: PrefabName[] = [];

      if (flags & EnemyFlags.Double && roll()) itemPrefabs.push("DoubleItem");
      if (flags & EnemyFlags.Drain && roll()) itemPrefabs.push("DrainItem");
      if (flags & EnemyFlags.Healthy && roll()) itemPrefabs.push("HealItem");

      if (roll()) itemPrefabs.push("MoneyItem");
      if (roll()) itemPrefabs.push("JunkItem");
      if (roll()) itemPrefabs.push("RechargeItem");

      let bombPrefab: PrefabName | undefined = undefined;
      if (roll()) {
        const specials = getEntityTree(g, e).filter(
          (e) => e.tags.has("Special") && e.prefab && e.turret
        );

        if (specials.length) {
          const special = oneOf(specials);
          bombPrefab = special.prefab!;
          itemPrefabs.push("BombItem");
        }
      }

      const distribution = shuffle([
        pos(-1, -1),
        pos(0, -1),
        pos(1, -1),
        pos(-1, 0),
        pos(0, 0),
        pos(1, 0),
        pos(-1, 1),
        pos(0, 1),
        pos(1, 1),
      ]);

      for (const prefab of itemPrefabs) {
        const pos = addPositions(position, distribution.pop()!);

        const item = g
          .spawn(prefab)
          .move(pos.x, pos.y)
          .setMotion({ angle: Angles.Down, vel: 1 });

        // TODO money amount etc.

        if (prefab === "BombItem")
          item.setItem({ type: "bomb", prefab: bombPrefab! });
      }
    }
  });
}
