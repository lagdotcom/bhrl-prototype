export default class HashMap<K, V> {
  items: Map<string, V>;

  constructor(private keyFn: (key: K) => string) {
    this.items = new Map();
  }

  has(key: K) {
    return this.items.has(this.keyFn(key));
  }

  get(key: K) {
    return this.items.get(this.keyFn(key));
  }

  getOrDefault(key: K, fallback: V) {
    const value = this.items.get(this.keyFn(key));
    return typeof value !== "undefined" ? value : fallback;
  }

  getOrDie(key: K) {
    const s = this.keyFn(key);
    const item = this.items.get(s);
    if (typeof item === "undefined") throw new Error(`Invalid key: ${s}`);
    return item;
  }

  set(key: K, value: V) {
    this.items.set(this.keyFn(key), value);
  }
}
