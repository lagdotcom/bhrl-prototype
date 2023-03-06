import Engine from "@app/Engine";
import Query from "@app/Query";

export default function addLifetime(g: Engine) {
  const query = new Query(g.entities, ["lifetime"]);
  g.on("tick", () =>
    query.forEach(({ lifetime }, e) => {
      if (--lifetime.duration <= 0) g.kill(e);
      else if (lifetime.decayingAppearance && e.appearance) {
        const patch = lifetime.decayingAppearance[lifetime.duration - 1];
        Object.assign(e.appearance, patch);
      }
    })
  );
}
