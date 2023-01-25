export enum Layer {
  Effect,
  Ship,
  Bullet,
  Player,
}

export default class Appearance {
  constructor(
    public glyph: string,
    public layer: Layer,
    public fg: number,
    public bg?: number
  ) {}
}
