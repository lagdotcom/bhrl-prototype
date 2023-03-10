export default function chance(percentage: number) {
  return Math.random() * 100 < percentage;
}
