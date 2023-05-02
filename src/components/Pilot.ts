import { PrefabName } from "@app/prefabs";
import PilotClass from "@app/types/PilotClass";

type Pilot = {
  name: string;
  player?: boolean;
  star?: boolean;
  body: number;
  mind: number;
  spirit: number;
  talent: number;
  class: PilotClass[];
  special?: PrefabName;
};
export default Pilot;
