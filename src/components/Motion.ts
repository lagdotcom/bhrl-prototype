export default class Motion {
  constructor(public angle: number, public vel: number) {}

  get x() {
    return Math.cos(this.angle) * this.vel;
  }

  get y() {
    return Math.sin(this.angle) * this.vel;
  }
}
