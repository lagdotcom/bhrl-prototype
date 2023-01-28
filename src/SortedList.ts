export default class SortedList<T> {
  dirty: boolean;

  constructor(
    private compareFn: (a: T, b: T) => number,
    private items: T[] = []
  ) {
    this.dirty = true;
  }

  clear() {
    this.items = [];
    this.dirty = false;
  }

  add(item: T) {
    this.items.push(item);
    this.dirty = true;
  }

  delete(item: T) {
    this.items = this.items.filter((i) => i !== item);
  }

  sort() {
    this.items.sort(this.compareFn);
    this.dirty = false;
  }

  get() {
    if (this.dirty) this.sort();
    return this.items.slice();
  }
}
