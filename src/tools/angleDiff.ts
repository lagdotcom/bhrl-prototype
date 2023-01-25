const tau = Math.PI * 2;

export default function angleDiff(x: number, y: number) {
  const a = (x - y) % tau;
  const b = (y - x) % tau;

  return a < b ? -a : b;
}
