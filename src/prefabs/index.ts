import * as battleship from "./battleship";
import * as bullet from "./bullet";
import * as effect from "./effect";
import * as fighter from "./fighter";
import * as gun from "./gun";
import * as player from "./player";
import * as ships from "./ships";
import * as sword from "./sword";

import Engine from "@app/Engine";
import Entity from "@app/Entity";

const AllPrefabs = {
  ...battleship,
  ...bullet,
  ...effect,
  ...fighter,
  ...gun,
  ...player,
  ...ships,
  ...sword,
};

export type PrefabName = keyof typeof AllPrefabs;

export default function instantiate(g: Engine, name: PrefabName) {
  return g.add(new Entity(g, name).applyPrefab(name, AllPrefabs[name]));
}
