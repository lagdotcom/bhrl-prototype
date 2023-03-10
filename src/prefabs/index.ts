import * as bullet from "./bullet";
import * as effect from "./effect";
import * as gun from "./gun";
import * as items from "./items";
import * as player from "./player";
import * as ships from "./ships";
import * as starSpecial from "./starSpecial";
import * as sword from "./sword";

import Engine from "@app/Engine";
import Entity from "@app/Entity";

const AllPrefabs = {
  ...bullet,
  ...effect,
  ...items,
  ...gun,
  ...player,
  ...ships,
  ...starSpecial,
  ...sword,
};

export type PrefabName = keyof typeof AllPrefabs;

export function getPrefab(name: PrefabName) {
  return AllPrefabs[name];
}

export default function instantiate(g: Engine, name: PrefabName) {
  return g.add(new Entity(g, name).applyPrefab(name, AllPrefabs[name]));
}

export const smartBombs: PrefabName[] = [
  "Cleave",
  "Outcry",
  "AcidSplash",
  "ShuttleLaunch",
  "Veto",
  "TalonSwipe",
  "CrushPattern",
  "Smite",

  "Salvo",
  "TheDragonWakes",
  "Bellow",
  "DemandHomage",

  "Multiball",
  "StubbornDescent",
  // FIXME "LaserBeam",
  "Switchblades",
  "Triangulate",
  "Overload",
];
