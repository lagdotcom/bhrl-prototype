import { Colors, Key } from "wglt";
import { getEntityLayout, getEntityMidpoint } from "@app/logic/entity";

import Engine from "@app/Engine";
import Entity from "@app/Entity";
import GameMode from "@app/types/GameMode";
import { Position } from "@app/components";
import Sector from "@app/types/Sector";
import { addSystems } from "@app/systems";
import { drawExamineOverlay } from "@app/logic/examine";
import { fireAirFist } from "@app/logic/airFist";
import int from "@app/tools/int";
import { isSameCell } from "@app/tools/position";

export default class CombatMode implements GameMode {
  dirty: boolean;
  examineAt?: Position;
  examining: Entity[];
  showOverlay?: string;

  constructor(public g: Engine, public sector: Sector) {
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

    g.blankMap();

    const { width, height } = getEntityLayout(g, g.player);
    g.player.move(int(g.mapWidth / 2 - width / 2), g.mapHeight - height - 4);

    addSystems(g);
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

    if (this.examineAt)
      drawExamineOverlay(this.g, this.examineAt, this.examining);
  }

  update() {
    if (this.g.term.mouse.dx || this.g.term.mouse.dy) this.handleMouseMove();

    this.handleKeys();

    if (this.dirty) this.draw();
  }

  examine(pos: Position) {
    if (isSameCell(this.examineAt, pos)) return;

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