export default function without<T>(array: T[], ...remove: T[]) {
  return array.filter((i) => !remove.includes(i));
}
