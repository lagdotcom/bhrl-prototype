export default class Turret {
  constructor(
    public bulletVelocity: number,
    public salvoCount: number,
    public timeBetweenShots: number,
    public timeBetweenSalvos: number,
    public mode = "idle",
    public timer = 0,
    public salvo = 0
  ) {}
}

export function turretReducer(state: Turret) {
  switch (state.mode) {
    case "idle":
      state.mode = "fire";
      state.salvo = state.salvoCount - 1;
      state.timer = state.timeBetweenShots;
      break;

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
  }

  return state;
}
