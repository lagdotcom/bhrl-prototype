import Engine from "@app/Engine";
import Query from "@app/Query";
import { getStat } from "@app/logic/pilot";

export default function addShields(g: Engine) {
  const query = new Query(g.entities, ["ship"]);
  g.on("tick", function RechargeShields() {
    query.forEach(({ ship }, e) => {
      if (ship.shield >= ship.maxShield) {
        ship.shieldTimer = 0;
        return;
      }

      const threshold = 6 - getStat(e, "body");
      if (++ship.shieldTimer >= threshold) {
        ship.shield++;
        ship.shieldTimer = 0;
      }
    });
  });
}
