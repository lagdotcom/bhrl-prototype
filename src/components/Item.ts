type Item =
  | { type: "money"; value: number }
  | { type: "recharge" }
  | { type: "bomb" }
  | { type: "heal" }
  | { type: "double" }
  | { type: "drain" }
  | { type: "junk" };
export default Item;
