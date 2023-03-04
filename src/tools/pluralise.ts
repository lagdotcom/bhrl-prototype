export default function pluralise(s: string, n: number) {
  return n === 1 ? s : s + "s";
}
