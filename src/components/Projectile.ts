import PilotStat from "@app/types/PilotStat";

type Projectile = {
  damage: number;
  special?: "increasedDropChance";
  scaling?: { stat: PilotStat; multiplier: number };
};
export default Projectile;
