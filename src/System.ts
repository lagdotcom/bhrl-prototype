import Query, { QueryCallback } from "@app/Query";

import Engine from "@app/Engine";
import { EntityAttribute } from "@app/components";

export default class System<T extends EntityAttribute[]> {
  query: Query<T>;

  constructor(public g: Engine, filter: T, private fn: QueryCallback<T>) {
    this.query = new Query(g.entities, filter);
  }

  run() {
    this.query.forEach(this.fn);
  }
}
