import { Turret } from "@app/components";

export default function turretReducer(state: Turret) {
  switch (state.mode) {
    case "fire":
      state.timer--;
      if (state.salvo > 0) {
        if (state.timer <= 0) state.mode = "mid-salvo";
      } else {
        state.mode = "reloading";
      }
      break;

    case "mid-salvo":
      state.mode = "fire";
      state.salvo--;
      if (state.salvo > 0) state.timer = state.timeBetweenShots;
      else state.timer = state.timeBetweenSalvos;
      break;

    case "reloading":
      state.timer--;
      if (state.timer <= 0) state.mode = "idle";
      break;

    case "idle":
    default:
      state.mode = "fire";
      state.salvo = state.salvoCount - 1;
      state.timer = state.timeBetweenShots;
      break;
  }

  return state;
}
