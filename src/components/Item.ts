import { PrefabName } from "@app/prefabs";

type Item =
  | { type: "money"; value: number }
  | { type: "recharge" }
  | { type: "bomb"; prefab: PrefabName }
  | { type: "heal" }
  | { type: "double" }
  | { type: "drain" }
  | { type: "junk" };
export default Item;
