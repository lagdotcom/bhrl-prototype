export default function lerp(start: number, end: number, t: number) {
  return start * (1.0 - t) + end * t;
}
