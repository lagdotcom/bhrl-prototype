export default class Motion {
  constructor(public x: number, public y: number) {}

  static fromAngleAndVelocity(angle: number, vel: number) {
    return new Motion(Math.cos(angle) * vel, Math.sin(angle) * vel);
  }
}
