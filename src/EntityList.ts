import Entity from "@app/Entity";

export default class EntityList {
  dirty: boolean;

  constructor(
    private compareFn: (a: Entity, b: Entity) => number,
    private entities: Entity[] = []
  ) {
    this.dirty = true;
  }

  clear() {
    this.entities = [];
    this.dirty = false;
  }

  clearExceptFor(ids: number[]) {
    for (const e of this.entities) {
      if (!ids.includes(e.id)) e.alive = false;
    }

    this.clearDead();
  }

  add(e: Entity) {
    this.entities.push(e);
    this.dirty = true;
  }

  clearDead() {
    this.entities = this.entities.filter((i) => i.alive);
  }

  sort() {
    this.entities.sort(this.compareFn);
    this.dirty = false;
  }

  get() {
    if (this.dirty) this.sort();
    return this.entities.slice();
  }
}
