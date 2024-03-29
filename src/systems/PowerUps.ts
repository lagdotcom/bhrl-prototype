import Engine from "@app/Engine";
import { getEntityTree } from "@app/logic/entity";
import Query from "@app/Query";
import isDefined from "@app/tools/isDefined";
import { Colors } from "wglt";

export default function addPowerUps(g: Engine) {
  const query = new Query(g.entities, ["ship"]);
  g.on("tick", function CountDownPowerUps() {
    query.forEach((_, e) => {
      if (e.doubleShot) {
        if (--e.doubleShot.duration <= 0) e.setDoubleShot();
      }
    });
  });

  g.on("draw", function ShowPowerUpGlow() {
    const positions = getEntityTree(g, g.player)
      .map((e) => e.position)
      .filter(isDefined);

    if (g.player.doubleShot) {
      for (const pos of positions) g.blend(pos.x, pos.y, Colors.LIGHT_GRAY);
    }
  });
}
