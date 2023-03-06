import { Colors, Key } from "wglt";
import { Pilot, Position } from "@app/components";

import CombatMode from "@app/CombatMode";
import Engine from "@app/Engine";
import GameMode from "@app/types/GameMode";
import Grid from "@app/Grid";
import { PrefabName } from "@app/prefabs";
import Sector from "@app/types/Sector";
import StarPilots from "@app/pilots/star";
import { isSameCell } from "@app/tools/position";
import oneOf from "@app/tools/oneOf";
import { putPilotInShip } from "@app/logic/pilot";

export default class CampaignMode implements GameMode {
  combat?: CombatMode;
  dirty: boolean;
  space!: Grid<Sector>;
  position!: Position;

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

    this.position = { x: 2, y: 2 };
    this.space = new Grid(5, 5, () => ({ completed: false }));
    const stars = new Set<Pilot>();
    const freePositions = this.space
      .getPositions()
      .filter((pos) => !isSameCell(this.position, pos));
    while (stars.size < 6) {
      const star = oneOf(StarPilots);

      if (!stars.has(star)) {
        stars.add(star);
        const position = oneOf(freePositions);
        const sector = this.space.get(position);
        sector.star = star;

        const i = freePositions.indexOf(position);
        freePositions.splice(i, 1);
      }
    }

    // this.startCombat();
  }

  startCombat() {
    this.combat = new CombatMode(this.g, this.space.get(this.position));
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

  draw() {
    const { term } = this.g;

    term.clear();

    const current = this.space.get(this.position);
    const cx = term.width / 2;

    term.drawCenteredString(cx, 2, "Known Space", Colors.WHITE);

    if (!current.completed)
      term.drawCenteredString(cx, 4, "Hit Enter to fight!", Colors.WHITE);

    const gridX = (term.width - 25) / 2;
    const gridY = (term.height - 25) / 2;

    for (let y = 0; y < 5; y++) {
      const sy = gridY + y * 5;

      for (let x = 0; x < 5; x++) {
        const sx = gridX + x * 5;
        const pos = { x, y };
        const sector = this.space.get(pos);

        term.fillRect(
          sx,
          sy,
          5,
          5,
          " ",
          undefined,
          sector.completed ? Colors.BLACK : Colors.DARK_RED
        );
        term.drawSingleBox(sx, sy, 5, 5, Colors.WHITE);

        if (isSameCell(pos, this.position))
          term.drawChar(sx + 2, sy + 2, "@", Colors.LIGHT_CYAN);
        else if (sector.star) term.drawChar(sx + 2, sy + 2, "*", Colors.YELLOW);
      }
    }

    this.dirty = false;
  }

  handleKeys() {
    const sector = this.space.get(this.position);

    if (
      !sector.completed &&
      (this.g.term.isKeyPressed(Key.VK_ENTER) ||
        this.g.term.isKeyPressed(Key.VK_NUMPAD_ENTER))
    )
      this.startCombat();
  }

  update() {
    this.handleKeys();

    if (this.combat) return this.combat.update();

    if (this.dirty) this.draw();
  }
}