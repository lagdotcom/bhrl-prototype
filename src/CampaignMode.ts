import CombatMode from "@app/CombatMode";
import { Pilot, Position } from "@app/components";
import Engine from "@app/Engine";
import Grid from "@app/Grid";
import { initialiseShip } from "@app/logic/enemy";
import { EntityWithComponents } from "@app/logic/entity";
import { putPilotInShip } from "@app/logic/pilot";
import playTheMusic from "@app/music";
import StarPilots from "@app/pilots/star";
import { PrefabName } from "@app/prefabs";
import oneOf from "@app/tools/oneOf";
import { addPositions, isSameCell, pos } from "@app/tools/position";
import GameMode from "@app/types/GameMode";
import Sector from "@app/types/Sector";
import { Colors, Key } from "wglt";

export default class CampaignMode implements GameMode {
  dirty: boolean;
  difficulty!: number;
  space!: Grid<Sector>;
  position!: Position;

  constructor(
    public g: Engine,
    public shipPrefab: PrefabName,
    public pilot: Pilot
  ) {
    this.dirty = true;
  }

  get currentSector() {
    return this.space.get(this.position);
  }

  refresh() {
    this.dirty = true;
  }

  init() {
    const { g } = this;

    g.clearEventHandlers();
    g.entities.clear();
    g.player = this.makePlayer();

    this.difficulty = 0;
    this.position = pos(2, 2);
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

    playTheMusic();
    this.startCombat();
  }

  startCombat() {
    this.g.setMode(new CombatMode(this.g, this));
  }

  endCombat() {
    this.g.clearEventHandlers();
    this.currentSector.completed = true;
    this.currentSector.star = undefined;
    this.difficulty++;

    // don't call setMode or we'll get initialised again
    this.g.mode = this;
    this.refresh();
  }

  makePlayer(): EntityWithComponents<
    ["pilot" | "position" | "player" | "ship"]
  > {
    const { g, shipPrefab, pilot } = this;

    const e = g.spawn(shipPrefab);
    if (!e.ship)
      throw new Error(
        `Ship prefab ${shipPrefab} doesn't have a ship component!`
      );

    putPilotInShip(g, e, pilot);
    initialiseShip(e.ship);

    // OK, doesn't technically have a position yet...
    return e as EntityWithComponents<
      ["pilot" | "position" | "player" | "ship"]
    >;
  }

  draw() {
    const { term } = this.g;

    term.fillRect(
      0,
      0,
      term.width,
      term.height,
      " ",
      Colors.WHITE,
      Colors.BLACK
    );

    const current = this.space.get(this.position);
    const cx = term.width / 2;

    term.drawCenteredString(cx, 2, "Known Space", Colors.WHITE);

    if (!current.completed) {
      term.drawCenteredString(cx, 4, "Hit Enter to fight!", Colors.WHITE);

      if (current.star)
        term.drawCenteredString(
          cx,
          34,
          `You will face: ${current.star.name}!`,
          Colors.YELLOW
        );
    }

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

    const move = this.g.term.getMovementKey();
    if (sector.completed && move) {
      const destination = addPositions(this.position, move);
      if (this.space.contains(destination)) {
        this.position = destination;
        this.dirty = true;
      }
    }
  }

  update() {
    this.handleKeys();
    if (this.dirty) this.draw();
  }
}
