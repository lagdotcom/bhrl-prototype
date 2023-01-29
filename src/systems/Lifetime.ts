import Engine from "@app/Engine";
import System from "@app/System";

export default function getLifetime(g: Engine) {
  return new System(g, ["lifetime"], ({ lifetime }, e) => {
    if (--lifetime.duration <= 0) e.kill();
  });
}
