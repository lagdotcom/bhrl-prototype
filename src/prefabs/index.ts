import * as battleship from "./battleship";
import * as bullet from "./bullet";
import * as effect from "./effect";
import * as gun from "./gun";
import * as player from "./player";

import Engine from "@app/Engine";

const AllPrefabs = {
  ...battleship,
  ...bullet,
  ...effect,
  ...gun,
  ...player,
};

export type PrefabName = keyof typeof AllPrefabs;

export default function instantiate(g: Engine, name: PrefabName) {
  return g.add(AllPrefabs[name](g));
}
