import ScaledValue from "@app/types/ScaledValue";

type Projectile = {
  damage: number;
  special?: "increasedDropChance";
  scaling?: ScaledValue;
};
export default Projectile;
