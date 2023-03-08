const quarter = Math.PI / 2;
const eighth = quarter / 2;

// radians baby
const Angles = {
  Right: 0,
  DownRight: eighth,
  Down: quarter,
  DownLeft: quarter + eighth,
  Left: quarter * 2,
  UpLeft: quarter * 2 + eighth,
  Up: quarter * 3,
  UpRight: quarter * 3 + eighth,
};
export default Angles;
