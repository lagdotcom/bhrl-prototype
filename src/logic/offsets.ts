import { pos } from "@app/tools/position";

const Offsets = {
  Right: pos(1, 0),
  DownRight: pos(1, 1),
  Down: pos(0, 1),
  DownLeft: pos(-1, 1),
  Left: pos(-1, 0),
  UpLeft: pos(-1, -1),
  Up: pos(0, -1),
  UpRight: pos(1, -1),

  None: pos(0, 0),
};
export default Offsets;
