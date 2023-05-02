import Engine from "@app/Engine";
import Entity from "@app/Entity";
import * as bullet from "@app/prefabs/bullet";
import * as effect from "@app/prefabs/effect";
import * as gun from "@app/prefabs/gun";
import * as items from "@app/prefabs/items";
import * as player from "@app/prefabs/player";
import * as ships from "@app/prefabs/ships";
import * as starSpecial from "@app/prefabs/starSpecial";
import * as sword from "@app/prefabs/sword";

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
