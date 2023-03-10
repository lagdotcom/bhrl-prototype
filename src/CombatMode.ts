import { Colors, Key } from "wglt";
import { getEntityLayout, getEntityTreeIDs } from "@app/logic/entity";
import { intPosition, pos } from "@app/tools/position";

import AttackWave from "@app/types/AttackWave";
import CampaignMode from "@app/CampaignMode";
import Engine from "@app/Engine";
import Entity from "@app/Entity";
import GameMode from "@app/types/GameMode";
import MenuMode from "./MenuMode";
import { Position } from "@app/components";
import { addSystems } from "@app/systems";
import { angleMove } from "@app/tools/angle";
import { drawExamineOverlay } from "@app/logic/examine";
import { getWaves } from "@app/logic/enemy";
import int from "@app/tools/int";
import { walkGrid } from "@app/logic/geometry";

export default class CombatMode implements GameMode {
  dirty: boolean;
  examineAt?: Position;
  examining: Entity[];
  showOverlay?: string;
  waves!: AttackWave[];

  constructor(public g: Engine, public campaign: CampaignMode) {
    this.dirty = true;
    this.examining = [];
  }

  refresh() {
    this.dirty = true;
  }

  init() {
    const { g } = this;

    this.examineAt = undefined;
    this.examining = [];

    this.waves = getWaves();

    g.blankMap();
    g.entities.clearExceptFor(getEntityTreeIDs(g, g.player));

    const { width, height } = getEntityLayout(g, g.player);
    g.player.move(int(g.mapWidth / 2 - width / 2), g.mapHeight - height - 4);
    g.player.ship.shield = g.player.ship.maxShield;

    addSystems(g);
    this.nextWave();

    g.on("waveNext", this.nextWave.bind(this));
  }

  nextWave() {
    const wave = this.waves.shift();
    if (wave) {
      const pilot =
        this.waves.length === 0 ? this.campaign.currentSector.star : undefined;
      this.g.fire("waveBegin", {
        wave,
        difficulty: this.campaign.difficulty,
        pilot,
      });
      return;
    }

    if (this.g.player.alive) {
      // TODO star pilot escape?
      this.campaign.currentSector.completed = true;
    }
  }

  draw() {
    const { map, mapWidth, mapHeight, overlays, player, term } = this.g;

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

    if (this.examineAt) {
      drawExamineOverlay(this.g, this.examineAt, this.examining);

      for (const e of this.examining) {
        const { motion, position } = e;
        if (motion && position) {
          const [dx, dy] = angleMove(motion);
          const dst = pos(position.x + dx, position.y + dy);

          const line = walkGrid(intPosition(position), intPosition(dst));

          for (const pos of line) this.g.blend(pos.x, pos.y, Colors.DARK_RED);
        }
      }
    }

    if (!player.alive) {
      term.drawCenteredString(
        term.width / 2,
        5,
        "YOU HAVE PERISHED!",
        Colors.LIGHT_RED,
        Colors.BLACK
      );
      term.drawCenteredString(
        term.width / 2,
        7,
        "Hit Escape to try again",
        Colors.LIGHT_RED,
        Colors.BLACK
      );
    } else if (this.campaign.currentSector.completed) {
      term.drawCenteredString(
        term.width / 2,
        5,
        "SECTOR COMPLETE",
        Colors.WHITE,
        Colors.BLACK
      );
      term.drawCenteredString(
        term.width / 2,
        7,
        "Hit Enter to continue",
        Colors.WHITE,
        Colors.BLACK
      );
    }
  }

  update() {
    if (this.g.term.mouse.dx || this.g.term.mouse.dy) this.refresh();

    this.handleKeys();

    if (this.dirty) {
      this.handleMouseMove();
      this.draw();
    }
  }

  examine(pos: Position) {
    this.examineAt = pos;
    this.dirty = true;

    const { solid, other } = this.g.getContents(pos);

    const set = new Set<Entity>();
    if (solid) set.add(this.g.getRoot(solid));
    for (const e of other) set.add(this.g.getRoot(e));

    this.examining = [...set];
  }

  handleMouseMove() {
    const { x, y } = this.g.term.mouse;
    this.examine({ x, y });
  }

  handleKeys() {
    const { player, term } = this.g;

    if (!player.alive) {
      if (term.isKeyPressed(Key.VK_ESCAPE)) {
        this.g.setMode(new MenuMode(this.g));
        term.fillRect(
          0,
          0,
          term.width,
          term.height,
          " ",
          Colors.WHITE,
          Colors.BLACK
        );
      }

      return;
    }

    if (
      this.campaign.currentSector.completed &&
      (term.isKeyPressed(Key.VK_ENTER) ||
        term.isKeyPressed(Key.VK_NUMPAD_ENTER))
    ) {
      this.campaign.endCombat();
      return;
    }

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

    if (term.isKeyPressed(Key.VK_SPACE)) {
      this.g.fire("playerBomb", undefined);
      return;
    }
  }
}
