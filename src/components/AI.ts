import Entity from "@app/Entity";

type AI = {
  attacking?: Entity;
  idealDistance: number;
  speed: number;
  visionRange: number;
};
export default AI;
