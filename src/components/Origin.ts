import Entity from "@app/Entity";
import Ship from "./Ship";
import Turret from "./Turret";

type Origin = { owner: Entity; ship: Ship; turret: Turret };
export default Origin;
