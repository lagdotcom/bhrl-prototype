import Engine from "@app/Engine";
import Angles from "@app/logic/angles";
import { PowerToFlags } from "@app/logic/enemy";
import { getEntityTree } from "@app/logic/entity";
import { PrefabName } from "@app/prefabs";
import chance from "@app/tools/chance";
import oneOf from "@app/tools/oneOf";
import { addPositions, pos } from "@app/tools/position";
import shuffle from "@app/tools/shuffle";
import EnemyFlags from "@app/types/EnemyFlags";

export default function addDrops(g: Engine) {
  g.on("kill", function DropItems({ e, reason }) {
    const { position, ship } = e;
    if (position && ship?.power && reason.type === "damage") {
      const flags = PowerToFlags[ship.power];
      const lucky =
        reason.source.e.projectile?.special === "increasedDropChance";

      const percentage =
        ship.type === "Battleship" ? (lucky ? 92 : 42) : lucky ? 32 : 2;
      const roll = (mul = 1) => chance(percentage * mul);
      // const roll = () => true;

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
        const offset = distribution.pop();
        if (!offset) return;

        const pos = addPositions(position, offset);

        // TODO cleverer motion pattern
        const item = g
          .spawn(prefab)
          .move(pos.x, pos.y)
          .setMotion({ angle: Angles.Down, vel: 1 });

        // TODO money amount etc.

        if (prefab === "BombItem" && bombPrefab)
          item.setItem({ type: "bomb", prefab: bombPrefab });
      }
    }
  });
}
