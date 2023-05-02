import Ship from "@app/components/Ship";
import Turret from "@app/components/Turret";
import Entity from "@app/Entity";

type Origin = { owner: Entity; ship: Ship; turret: Turret };
export default Origin;
