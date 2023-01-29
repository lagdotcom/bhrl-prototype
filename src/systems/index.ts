import Engine from "@app/Engine";
import addDrawEntities from "./DrawEntities";
import addExplosives from "./Explosives";
import addFields from "./Fields";
import addHoming from "./Homing";
import addLifetime from "./Lifetime";
import addMotion from "./Motion";
import addTrails from "./Trails";
import addTurrets from "./Turrets";

export function addSystems(g: Engine) {
  addLifetime(g);
  addHoming(g);
  addTurrets(g);
  addFields(g);
  addMotion(g);

  addDrawEntities(g);

  addTrails(g);

  addExplosives(g);
}
