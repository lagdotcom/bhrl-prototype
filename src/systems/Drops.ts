import EnemyFlags from "@app/types/EnemyFlags";
import Engine from "@app/Engine";
import { PowerToFlags } from "@app/logic/enemy";
import { PrefabName } from "@app/prefabs";
import { addPositions } from "@app/tools/position";
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

      console.log("calculating drops", {
        position,
        reason,
        ship,
        flags,
        lucky,
        chance,
      });

      const items: PrefabName[] = [];

      if (flags & EnemyFlags.Double && roll()) items.push("DoubleItem");
      if (flags & EnemyFlags.Drain && roll()) items.push("DrainItem");
      if (flags & EnemyFlags.Healthy && roll()) items.push("HealItem");

      if (roll()) items.push("MoneyItem");
      if (roll()) items.push("JunkItem");

      const distribution = shuffle([
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]);

      for (const item of items) {
        const pos = addPositions(position, distribution.pop()!);

        // TODO money amount etc.

        console.log("spawning", item, "at", pos);

        g.spawn(item).move(pos.x, pos.y);
      }
    }
  });
}
