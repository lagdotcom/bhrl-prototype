import { Motion, Position } from "@app/components";
import Angle from "@app/types/Angle";

const tau = Math.PI * 2;

export function angleBetween(a: Position, b: Position): Angle {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function angleDiff(x: number, y: number): Angle {
  const a = (x - y) % tau;
  const b = (y - x) % tau;

  return a < b ? -a : b;
}

export function angleMove(mo: Motion): [dx: number, dy: number] {
  const dx = Math.cos(mo.angle) * mo.vel;
  const dy = Math.sin(mo.angle) * mo.vel;
  return [dx, dy];
}

export function angleWrap(angle: Angle): Angle {
  while (angle < 0) angle += tau;
  return angle % tau;
}
