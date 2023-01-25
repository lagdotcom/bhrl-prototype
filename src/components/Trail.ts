import { PrefabName } from "../prefabs";

export default class Trail {
  constructor(public effectPrefab: PrefabName, public duration: number) {}
}
