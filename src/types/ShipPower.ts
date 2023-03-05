export const ShipPowers = [
  "Typical",
  "Healthy",
  "Double",
  "Multi",
  "Drain",
  "StarPilot",
  "Mega",
] as const;

type ShipPower = (typeof ShipPowers)[number];
export default ShipPower;
