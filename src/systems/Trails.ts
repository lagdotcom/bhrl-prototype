import Engine from "@app/Engine";
import { isSameCell } from "@app/tools/position";

export default function addTrails(g: Engine) {
  g.on("move", function LayTrails({ e, old, pos }) {
    if (e.trail && !isSameCell(old, pos))
      g.spawn(e.trail.effectPrefab).setPosition(old);
  });
}
