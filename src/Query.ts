import { EntityAttribute } from "@app/components";
import Entity from "@app/Entity";
import EntityList from "@app/EntityList";
import {
  entityHasComponents,
  EntityWithComponents,
  HasComponents,
} from "@app/logic/entity";

export type QueryCallback<T extends EntityAttribute[]> = (
  components: HasComponents<T>,
  e: EntityWithComponents<T>
) => void;

export default class Query<T extends EntityAttribute[]> {
  matches: (e: Entity) => boolean;

  constructor(private list: EntityList, filter: T) {
    this.matches = entityHasComponents(filter);
  }

  forEach(cb: QueryCallback<T>) {
    for (const e of this.list.get()) {
      if (this.matches(e))
        cb(e as HasComponents<T>, e as EntityWithComponents<T>);
    }
  }
}
