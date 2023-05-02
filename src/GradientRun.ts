import lerp from "@app/tools/lerp";
import RGBA from "@app/types/RGBA";
import { fromRgb } from "wglt";

type GradientPoint = [breakpoint: number, colour: RGBA];

export default class GradientRun {
  constructor(public points: GradientPoint[]) {
    this.sort();
  }

  private sort() {
    this.points.sort(([a], [b]) => a - b);
  }

  add(breakpoint: number, c: RGBA): this {
    this.points.push([breakpoint, c]);
    this.sort();
    return this;
  }

  get(value: number) {
    const [low, lowColour] = this.points[0];
    if (value <= low) return fromRgb(...lowColour);

    const [high, highColour] = this.points[this.points.length - 1];
    if (value >= high) return fromRgb(...highColour);

    const higherIndex = this.points.findIndex(([p]) => p > value);
    const [below, [ar, ag, ab, aa]] = this.points[higherIndex - 1];
    const [above, [br, bg, bb, ba]] = this.points[higherIndex];

    const r = (value - below) / (above - below);
    return fromRgb(
      lerp(ar, br, r),
      lerp(ag, bg, r),
      lerp(ab, bb, r),
      lerp(aa, ba, r)
    );
  }
}
