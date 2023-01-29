export default function int(n?: number) {
  return typeof n === "undefined" ? NaN : Math.floor(n);
}
