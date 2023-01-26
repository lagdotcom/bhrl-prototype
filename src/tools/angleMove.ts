import Motion from "@app/components/Motion";

export default function angleMove(mo: Motion): [dx: number, dy: number] {
  const dx = Math.cos(mo.angle) * mo.vel;
  const dy = Math.sin(mo.angle) * mo.vel;
  return [dx, dy];
}
