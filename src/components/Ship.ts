import ShipPower from "@app/types/ShipPower";

type Ship = {
  name: string;
  type: "Escort" | "Battleship";
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  power?: ShipPower;
};
export default Ship;
