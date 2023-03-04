export default function enumerate(max: number, min = 0) {
  const items: number[] = [];
  for (let i = min; i < max; i++) items.push(i);
  return items;
}
