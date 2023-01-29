import { Turret } from "@app/components";

export default function isTurretFiring(state: Turret): boolean {
  if (state.timer) {
    state.timer--;
    if (state.timer <= 0 && state.salvo <= 0) state.salvo = state.salvoCount;
    return false;
  }

  if (--state.salvo <= 0) state.timer = state.timeBetweenSalvos;
  else state.timer = state.timeBetweenShots;
  return true;
}
