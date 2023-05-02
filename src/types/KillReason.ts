import Entity from "@app/Entity";
import DamageSource from "@app/types/DamageSource";

type KillReason =
  | { type: "exitedMap" | "expired" | "hitWall" }
  | { type: "hitEntity"; other: Entity }
  | { type: "damage"; source: DamageSource };
export default KillReason;
