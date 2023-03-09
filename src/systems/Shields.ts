import Engine from "@app/Engine";
import Query from "@app/Query";

export default function addShields(g: Engine) {
  const query = new Query(g.entities, ["ship"]);
  g.on("tick", function RechargeShields() {
    query.forEach(({ pilot, ship }) => {
      if (ship.shield >= ship.maxShield) {
        ship.shieldTimer = 0;
        return;
      }

      const threshold = 6 - (pilot?.body ?? 0);
      if (++ship.shieldTimer >= threshold) {
        ship.shield++;
        ship.shieldTimer = 0;
      }
    });
  });
}
