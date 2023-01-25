export enum Layer {
  Effect,
  Ship,
  Gun,
  Bullet,
  Player,
}

type Appearance = {
  glyph: string;
  layer: Layer;
  fg?: number;
  bg?: number;
};
export default Appearance;
