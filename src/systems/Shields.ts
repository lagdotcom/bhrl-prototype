import Engine from "@app/Engine";
import Query from "@app/Query";

export default function addShields(g: Engine) {
  const query = new Query(g.entities, ["pilot", "ship"]);
  g.on("tick", () =>
    query.forEach(({ pilot, ship }) => {
      const recharge = pilot.body;
      ship.shield = Math.min(ship.maxShield, ship.shield + recharge);
    })
  );
}
