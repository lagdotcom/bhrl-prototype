import { ComponentMap, EntityAttribute, Position } from "@app/components";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import { addPositions, pos } from "@app/tools/position";
import { HasFields } from "@app/tools/types";

type LayoutEntry<T = Entity> = {
  absolute: Position;
  offset: Position;
  entity: T;
};

export function getLayoutMidpoint(
  layout: LayoutEntry[],
  topLeft: Position
): Position {
  if (!topLeft || !layout.length) throw new Error("Could not get midpoint");

  const avg = (key: keyof Position) =>
    layout.reduce((total, { offset }) => total + offset[key], 0) /
    layout.length;

  return pos(topLeft.x + avg("x"), topLeft.y + avg("y"));
}

export function getLayoutBlockers(
  g: Engine,
  layout: LayoutEntry[],
  topLeft: Position,
  ignoreSolid: number[] = []
): LayoutEntry<Entity | "wall" | "oob">[] {
  const blockers: LayoutEntry<Entity | "wall" | "oob">[] = [];

  for (const { offset } of layout) {
    const pos = addPositions(topLeft, offset);
    const { oob, wall, solid } = g.getContents(pos, ignoreSolid);
    if (oob) blockers.push({ absolute: pos, offset, entity: "oob" });
    else if (wall) blockers.push({ absolute: pos, offset, entity: "wall" });
    else if (solid) blockers.push({ absolute: pos, offset, entity: solid });
  }

  return blockers;
}

export function getEntityTree(g: Engine, e: Entity) {
  const root = g.getRoot(e);
  return g.entities.get().filter((x) => g.getRoot(x) === root);
}

export function getEntityTreeIDs(g: Engine, e: Entity) {
  return getEntityTree(g, e).map((x) => x.id);
}

export function getEntityLayout(g: Engine, e: Entity) {
  const topLeft = g.getRoot(e).position ?? pos(0, 0);

  const parts = getEntityTree(g, e);
  const layout: LayoutEntry[] = [];
  let width = 0;
  let height = 0;

  for (const part of parts) {
    const { attachment, solid } = part;

    if (attachment && solid) {
      const { x, y } = attachment;

      layout.push({
        absolute: addPositions(topLeft, attachment),
        offset: { x, y },
        entity: part,
      });

      width = Math.max(x + 1, width);
      height = Math.max(y + 1, height);
    }
  }

  return { layout, topLeft, width, height };
}

export function getEntityBlockers(g: Engine, e: Entity, origin?: Position) {
  const ignoreSolid = getEntityTreeIDs(g, e);
  const { layout, topLeft } = getEntityLayout(g, e);
  if (!origin || !topLeft) return [];

  return getLayoutBlockers(g, layout, origin || topLeft, ignoreSolid);
}

export function getEntityMidpoint(g: Engine, e: Entity): Position {
  const { layout, topLeft } = getEntityLayout(g, e);

  if (!topLeft || !layout.length) {
    if (e.position) return e.position;

    throw new Error(`Could not get midpoint of entity#${e.id}`);
  }

  return getLayoutMidpoint(layout, topLeft);
}

export function isSpaceFree(
  g: Engine,
  sx: number,
  sy: number,
  w: number,
  h: number
) {
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const { oob, wall, solid, other } = g.getContents({
        x: sx + x,
        y: sy + y,
      });
      if (oob || wall || solid || other.length) return false;
    }

  return true;
}

export type HasComponents<T extends EntityAttribute[]> = HasFields<
  ComponentMap,
  T
>;

export type EntityWithComponents<T extends EntityAttribute[]> = Entity &
  HasComponents<T>;

export function hasComponents<T extends EntityAttribute[]>(
  e: Entity,
  filter: T
): e is EntityWithComponents<T> {
  if (!e.alive) return false;

  for (const key of filter) {
    if (!e[key]) return false;
  }

  return true;
}

export function entityHasComponents<T extends EntityAttribute[]>(filter: T) {
  return (e: Entity): e is EntityWithComponents<T> => hasComponents(e, filter);
}
