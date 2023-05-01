interface Flavouring<FlavourT> {
  _type?: FlavourT;
}
export type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;
