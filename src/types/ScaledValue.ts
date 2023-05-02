import PilotStat from "@app/types/PilotStat";

type ScaledValue =
  | number
  | { type: "pilot"; stat: PilotStat; base: number; multiplier: number };
export default ScaledValue;
