import { Colors, Key } from "wglt";

import Engine from "@app/Engine";
import GameMode from "@app/types/GameMode";
import Glyphs from "@app/logic/glyphs";
import MainMode from "@app/MainMode";
import { Pilot } from "@app/components";
import { angleMove } from "@app/tools/angle";
import { intPosition } from "@app/tools/position";
import oneOf from "@app/tools/oneOf";

type Star = {
  x: number;
  y: number;
  c: string;
  fg: number;
  angle: number;
  vel: number;
};

type StatName = "body" | "mind" | "spirit" | "talent";

const StatColours = [
  0,
  Colors.DARK_RED,
  Colors.BROWN,
  Colors.LIGHT_RED,
  Colors.ORANGE,
  Colors.YELLOW,
  Colors.WHITE,
];

export default class MenuMode implements GameMode {
  dirty!: boolean;
  pilot!: Pilot;
  points!: number;
  starfieldCounter!: number;
  stars!: Star[];

  constructor(
    public g: Engine,
    public starfieldSpeed = 5,
    public starCount = 100
  ) {}

  init() {
    this.dirty = true;
    this.pilot = {
      name: "Player",
      difficulty: NaN,
      body: 1,
      mind: 1,
      spirit: 1,
      talent: 1,
      class: [],
    };
    this.points = 6;

    this.starfieldCounter = 0;
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) this.stars.push(this.newStar());
  }

  draw() {
    const { term } = this.g;

    term.clear();

    for (const star of this.stars) {
      const { x, y } = intPosition(star);
      term.drawChar(x, y, star.c, star.fg);
    }

    const cx = term.width / 2;

    term.drawCenteredString(cx, 2, "Bullet Hell Roguelike", Colors.WHITE);

    term.drawCenteredString(cx, 9, "Create your Pilot", Colors.WHITE);

    term.drawCenteredString(cx, 10, `${this.points} points`, Colors.YELLOW);

    const pad = 2;
    const qtr = Math.floor((term.width - pad * 2) / 4);
    const start = pad + qtr / 2;
    this.drawStat("body", start);
    this.drawStat("mind", start + qtr);
    this.drawStat("spirit", start + qtr * 2);
    this.drawStat("talent", start + qtr * 3);

    if (this.points === 0)
      term.drawCenteredString(cx, 20, "Hit Enter to begin!", Colors.WHITE);

    this.dirty = false;
  }

  drawStat(stat: StatName, x: number) {
    const { term } = this.g;

    const label = `(${stat[0].toUpperCase()})${stat.slice(1)}`;
    const value = this.pilot[stat];

    term.drawCenteredString(x, 13, label, Colors.LIGHT_CYAN);
    term.drawCenteredString(x, 14, value.toString(), StatColours[value]);
  }

  update() {
    this.handleStarfield();
    this.handleKeys();

    if (this.dirty) this.draw();
  }

  newStar(): Star {
    const { term } = this.g;

    const fg = oneOf([
      Colors.DARK_RED,
      Colors.LIGHT_RED,
      Colors.YELLOW,
      Colors.LIGHT_CYAN,
      Colors.WHITE,
    ]);
    const vel = 0.5 + Math.random();
    const c = vel < 0.75 ? "." : vel < 1.25 ? Glyphs.Dot : "*";
    const angle = Math.random() * Math.PI * 2;

    return { x: term.width / 2, y: term.height / 2, c, fg, vel, angle };
  }

  handleStarfield() {
    if (this.starfieldCounter < this.starfieldSpeed) {
      this.starfieldCounter++;
      return;
    }

    this.starfieldCounter = 0;
    this.dirty = true;

    const { width, height } = this.g.term;

    for (const star of this.stars) {
      const [dx, dy] = angleMove(star);
      star.x += dx;
      star.y += dy;

      if (star.x < 0 || star.x >= width || star.y < 0 || star.y >= height)
        Object.assign(star, this.newStar());
    }
  }

  isPressed(key: Key, shift: boolean) {
    const shiftDown =
      this.g.term.isKeyDown(Key.VK_SHIFT_LEFT) ||
      this.g.term.isKeyDown(Key.VK_SHIFT_RIGHT);
    return this.g.term.isKeyPressed(key) && shift === shiftDown;
  }

  changeStat(stat: StatName, value: number) {
    const newValue = this.pilot[stat] + value;

    if (newValue < 1 || newValue > 6) return false;

    this.points -= value;
    this.pilot[stat] = newValue;
    this.dirty = true;
  }

  handleKeys() {
    if (this.points > 0) {
      if (this.isPressed(Key.VK_B, false)) this.changeStat("body", 1);
      if (this.isPressed(Key.VK_M, false)) this.changeStat("mind", 1);
      if (this.isPressed(Key.VK_S, false)) this.changeStat("spirit", 1);
      if (this.isPressed(Key.VK_T, false)) this.changeStat("talent", 1);
    }

    if (this.isPressed(Key.VK_B, true)) this.changeStat("body", -1);
    if (this.isPressed(Key.VK_M, true)) this.changeStat("mind", -1);
    if (this.isPressed(Key.VK_S, true)) this.changeStat("spirit", -1);
    if (this.isPressed(Key.VK_T, true)) this.changeStat("talent", -1);

    if (this.points === 0 && this.g.term.isKeyPressed(Key.VK_ENTER))
      this.g.setMode(new MainMode(this.g, "PlayerShip", this.pilot));
  }
}
