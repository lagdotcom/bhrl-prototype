import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { Position } from "@app/components";
import { addPositions } from "@app/tools/position";

export function getEntityTree(g: Engine, e: Entity) {
  const root = g.getRoot(e);
  return g.entities.get().filter((x) => g.getRoot(x) === root);
}

export function getEntityTreeIDs(g: Engine, e: Entity) {
  return getEntityTree(g, e).map((x) => x.id);
}

export function getEntityLayout(g: Engine, e: Entity) {
  const parts = getEntityTree(g, e);
  const layout: [Position, Entity][] = [];

  for (const x of parts) {
    const { attachment, solid } = x;

    if (attachment && solid)
      layout.push([{ x: attachment.x, y: attachment.y }, x]);
  }

  return { layout, topLeft: g.getRoot(e).position };
}

export function getEntityBlockers(g: Engine, e: Entity, topLeft: Position) {
  const ignoreSolid = getEntityTreeIDs(g, e);
  const { layout } = getEntityLayout(g, e);
  const blockers: [Position, Entity | "wall"][] = [];

  for (const [offset] of layout) {
    const pos = addPositions(topLeft, offset);
    const { wall, solid } = g.getContents(pos, ignoreSolid);
    if (wall) blockers.push([pos, "wall"]);
    else if (solid) blockers.push([pos, solid]);
  }

  return blockers;
}

export function getEntityMidpoint(g: Engine, e: Entity): Position {
  const { layout, topLeft } = getEntityLayout(g, e);

  if (!topLeft || !layout.length)
    throw new Error(`Could not get midpoint of entity#${e.id}`);

  const avg = (key: keyof Position) =>
    layout.reduce((total, [pos]) => total + pos[key], 0) / layout.length;

  return { x: topLeft.x + avg("x"), y: topLeft.y + avg("y") };
}
