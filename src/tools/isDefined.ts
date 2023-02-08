export default function isDefined<T>(obj?: T): obj is T {
  return typeof obj !== "undefined";
}
