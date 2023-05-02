import Appearance from "@app/components/Appearance";

type Lifetime = {
  duration: number;
  decayingAppearance?: Partial<Appearance>[];
};
export default Lifetime;
