import Angle from "@app/types/Angle";

const quarter = Math.PI / 2;
const eighth = quarter / 2;

// radians baby
const Angles = {
  Right: 0 as Angle,
  DownRight: eighth as Angle,
  Down: quarter as Angle,
  DownLeft: (quarter + eighth) as Angle,
  Left: (quarter * 2) as Angle,
  UpLeft: (quarter * 2 + eighth) as Angle,
  Up: (quarter * 3) as Angle,
  UpRight: (quarter * 3 + eighth) as Angle,
};
export default Angles;
