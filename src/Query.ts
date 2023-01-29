import { EntityAttribute, EntityMap } from "@app/components";

import Entity from "@app/Entity";
import EntityList from "@app/EntityList";

export type HasComponents<T extends EntityAttribute[]> = Pick<
  EntityMap,
  T[number]
> &
  Partial<EntityMap>;

export type QueryCallback<T extends EntityAttribute[]> = (
  components: HasComponents<T>,
  e: Entity
) => void;

export default class Query<T extends EntityAttribute[]> {
  constructor(private list: EntityList, private filter: T) {}

  matches(e: Entity) {
    if (!e.alive) return false;

    for (const key of this.filter) {
      if (!e[key]) return false;
    }

    return true;
  }

  forEach(cb: QueryCallback<T>) {
    for (const e of this.list.get()) {
      if (this.matches(e)) cb(e as HasComponents<T>, e);
    }
  }
}