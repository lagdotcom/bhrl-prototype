import CombatMode from "@app/CombatMode";
import Engine from "@app/Engine";
import GameMode from "@app/types/GameMode";
import { Pilot } from "@app/components";
import { PrefabName } from "@app/prefabs";
import { putPilotInShip } from "@app/logic/pilot";

export default class CampaignMode implements GameMode {
  combat?: CombatMode;
  dirty: boolean;

  constructor(
    public g: Engine,
    public shipPrefab: PrefabName,
    public pilot: Pilot
  ) {
    this.dirty = true;
  }

  refresh() {
    if (this.combat) this.combat.refresh();
    else this.dirty = true;
  }

  init() {
    const { g } = this;

    g.clearEventHandlers();
    g.entities.clear();
    g.player = this.makePlayer();

    // TODO etc.
    this.combat = new CombatMode(g);
    this.combat.init();
  }

  makePlayer() {
    const { g, shipPrefab, pilot } = this;

    const e = g.spawn(shipPrefab);
    if (!e.ship)
      throw new Error(
        `Ship prefab ${shipPrefab} doesn't have a ship component!`
      );

    putPilotInShip(e, pilot);

    e.ship.hp = e.ship.maxHp;
    e.ship.shield = e.ship.maxShield;

    return e;
  }

  update() {
    if (this.combat) return this.combat.update();

    // TODO
  }
}
