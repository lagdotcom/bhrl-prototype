import PilotClass from "@app/types/PilotClass";

type Pilot = {
  name: string;
  difficulty: number;
  body: number;
  mind: number;
  spirit: number;
  talent: number;
  class: PilotClass[];
};
export default Pilot;
