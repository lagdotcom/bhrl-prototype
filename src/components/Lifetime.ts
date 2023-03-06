import Appearance from "./Appearance";

type Lifetime = {
  duration: number;
  decayingAppearance?: Partial<Appearance>[];
};
export default Lifetime;
