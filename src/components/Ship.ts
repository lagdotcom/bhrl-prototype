import Angle from "@app/types/Angle";
import ShipPower from "@app/types/ShipPower";

type Ship = {
  name: string;
  type: "Escort" | "Battleship" | "Player";
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  shieldTimer: number;
  firingDirection: Angle;
  power?: ShipPower;
};
export default Ship;
