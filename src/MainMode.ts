import { Colors, Key } from "wglt";
import { getEntityLayout, getEntityMidpoint } from "@app/logic/entity";

import Engine from "@app/Engine";
import GameMode from "@app/types/GameMode";
import { Pilot } from "@app/components";
import { PrefabName } from "@app/prefabs";
import { addSystems } from "@app/systems";
import { fireAirFist } from "@app/logic/airFist";
import int from "@app/tools/int";
import { putPilotInShip } from "@app/logic/pilot";

export default class MainMode implements GameMode {
  dirty: boolean;
  showOverlay?: string;

  constructor(
    public g: Engine,
    public shipPrefab: PrefabName,
    public pilot: Pilot
  ) {
    this.dirty = true;
  }

  init() {
    const { g } = this;

    g.clearEventHandlers();

    g.entities.clear();
    g.blankMap();

    g.player = this.makePlayer();

    const { width, height } = getEntityLayout(g, g.player);
    g.player.move(int(g.mapWidth / 2 - width / 2), g.mapHeight - height - 4);

    addSystems(g);
  }

  makePlayer() {
    const { g, shipPrefab, pilot } = this;

    const e = g.spawn(shipPrefab);
    putPilotInShip(e, pilot);

    e.ship!.hp = e.ship!.maxHp;
    e.ship!.shield = e.ship!.maxShield;

    return e;
  }

  draw() {
    const { map, mapWidth, mapHeight, overlays, term } = this.g;

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const cell = map.grid[y][x];

        // TODO scrolling etc.
        term.drawChar(x, y, 0, cell.fg, cell.bg);
      }
    }

    this.g.fire("draw", undefined);
    this.dirty = false;

    if (this.showOverlay) {
      const overlay = overlays.get(this.showOverlay);
      if (overlay) {
        for (let y = 0; y < mapHeight; y++) {
          for (let x = 0; x < mapWidth; x++) {
            const value = overlay.get({ x, y }) || Infinity;
            const ch = value === Infinity ? "-" : value < 10 ? `${value}` : "*";
            term.drawChar(x, y, ch, Colors.LIGHT_RED);
          }
        }
      }
    }
  }

  update() {
    this.handleKeys();
    if (this.dirty) this.draw();
  }

  handleKeys() {
    const { player, term } = this.g;

    const move = term.getMovementKey();
    if (move) {
      this.g.fire("playerMove", { move });
      return;
    }

    if (term.isKeyPressed(Key.VK_1)) {
      this.g.fire("playerFire", { array: 0 });
      return;
    }
    if (term.isKeyPressed(Key.VK_2)) {
      this.g.fire("playerFire", { array: 1 });
      return;
    }

    if (term.isKeyPressed(Key.VK_F)) {
      fireAirFist(this.g, getEntityMidpoint(this.g, player), 4.5);
      this.g.tick();
      return;
    }
  }
}
