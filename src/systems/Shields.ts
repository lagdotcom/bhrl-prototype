import Engine from "@app/Engine";
import { getShieldRechargeDelay } from "@app/logic/pilot";
import Query from "@app/Query";

export default function addShields(g: Engine) {
  const query = new Query(g.entities, ["ship"]);
  g.on("tick", function RechargeShields() {
    query.forEach(({ ship }, e) => {
      if (ship.shield >= ship.maxShield) {
        ship.shieldTimer = 0;
        return;
      }

      const delay = getShieldRechargeDelay(e);
      if (++ship.shieldTimer >= delay) {
        ship.shield++;
        ship.shieldTimer = 0;
      }
    });
  });
}
