export default function oneOf<T>(items: T[]): T {
  if (!items.length) throw new Error("oneOf passed empty array");

  return items[Math.floor(Math.random() * items.length)];
}
