import Engine from "@app/Engine";
import addAI from "@app/systems/AI";
import addDelayedShots from "@app/systems/DelayedShots";
import addDisplay from "@app/systems/Display";
import addDrops from "@app/systems/Drops";
import addExplosives from "@app/systems/Explosives";
import addFields from "@app/systems/Fields";
import addHoming from "@app/systems/Homing";
import addHUD from "@app/systems/HUD";
import addLifetime from "@app/systems/Lifetime";
import addMotion from "@app/systems/Motion";
import addPlayer from "@app/systems/Player";
import addPowerUps from "@app/systems/PowerUps";
import addShields from "@app/systems/Shields";
import addSpawns from "@app/systems/Spawns";
import addTrails from "@app/systems/Trails";
import addTurrets from "@app/systems/Turrets";

export function addSystems(g: Engine) {
  addLifetime(g);
  addHoming(g);
  addDelayedShots(g);
  addTurrets(g);
  addFields(g);
  addShields(g);
  addMotion(g);
  addAI(g);
  addSpawns(g);

  addDisplay(g);
  addHUD(g);

  addTrails(g);

  addExplosives(g);
  addDrops(g);
  addPowerUps(g);

  addPlayer(g);
}
