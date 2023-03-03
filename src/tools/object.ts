import nanoclone from "nanoclone";

export const clone = nanoclone;

export const keys = Object.keys as <K extends PropertyKey, V>(
  obj: Partial<Record<K, V>>
) => K[];

export const fromEntries = <K extends PropertyKey, V>(
  pairs: [K, V][]
): Record<K, V> => {
  const e: Partial<Record<K, V>> = {};
  for (const [k, v] of pairs) e[k] = v;
  return e as Record<K, V>;
};
