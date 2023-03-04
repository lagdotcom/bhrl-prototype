import Engine from "@app/Engine";
import addAI from "./AI";
import addDisplay from "./Display";
import addExplosives from "./Explosives";
import addFields from "./Fields";
import addHUD from "./HUD";
import addHoming from "./Homing";
import addLifetime from "./Lifetime";
import addMotion from "./Motion";
import addPlayer from "./Player";
import addSpawns from "./Spawns";
import addTrails from "./Trails";
import addTurrets from "./Turrets";

export function addSystems(g: Engine) {
  addLifetime(g);
  addHoming(g);
  addTurrets(g);
  addFields(g);
  addMotion(g);
  addAI(g);
  addSpawns(g);

  addDisplay(g);
  addHUD(g);

  addTrails(g);

  addExplosives(g);

  addPlayer(g);
}
