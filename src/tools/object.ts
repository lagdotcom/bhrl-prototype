import nanoclone from "nanoclone";

export const clone = nanoclone;

export const keys = Object.keys as <K extends string | number | symbol, V>(
  obj: Partial<Record<K, V>>
) => K[];
