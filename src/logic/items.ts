import { Item } from "@app/components";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { getEntityTree } from "@app/logic/entity";
import { getJunkBombChance, getMaxBombCount } from "@app/logic/pilot";
import { advanceTimer } from "@app/logic/turret";
import { smartBombs } from "@app/prefabs";
import chance from "@app/tools/chance";
import oneOf from "@app/tools/oneOf";

export function giveItem(g: Engine, e: Entity, item: Item): void {
  if (!e.ship || !e.player) return;

  switch (item.type) {
    case "double":
      if (e.doubleShot) e.doubleShot.duration += 9;
      else e.setDoubleShot({ duration: 9 });
      return;

    case "heal": {
      const amount = Math.ceil(e.ship.maxHp / 4);
      e.ship.hp = Math.min(e.ship.maxHp, e.ship.hp + amount);
      return;
    }

    case "recharge": {
      for (const te of getEntityTree(g, e)) {
        if (te.turret)
          while (te.turret.timer < Infinity && te.turret.timer > 0)
            advanceTimer(te.turret);
      }
      return;
    }

    case "bomb":
      e.player.bombs.push(item.prefab);
      while (e.player.bombs.length > getMaxBombCount(e)) e.player.bombs.shift();
      break;

    case "junk":
      if (chance(getJunkBombChance(e)))
        return giveItem(g, e, { type: "bomb", prefab: oneOf(smartBombs) });
      break;
  }
}
