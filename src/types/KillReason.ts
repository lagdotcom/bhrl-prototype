import DamageSource from "@app/types/DamageSource";
import Entity from "@app/Entity";

type KillReason =
  | { type: "exitedMap" | "expired" | "hitWall" }
  | { type: "hitEntity"; other: Entity }
  | { type: "damage"; source: DamageSource };
export default KillReason;
