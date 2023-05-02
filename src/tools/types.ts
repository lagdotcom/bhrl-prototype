export type HasFields<E, T extends (keyof E)[]> = Pick<E, T[number]> &
  Partial<E>;
