import Entity from "@app/Entity";

type AI = {
  attacking?: Entity;
  idealDistance: number;
  firingDistance?: number;
  speed: number;
};
export default AI;
