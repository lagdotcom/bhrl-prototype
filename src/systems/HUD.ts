import { Colors, Terminal } from "wglt";

import Engine from "@app/Engine";
import Glyphs from "@app/logic/glyphs";
import { Turret } from "@app/components";
import { getEntityTree } from "@app/logic/entity";
import { getState } from "@app/logic/turret";
import pluralise from "@app/tools/pluralise";

export const HUD_HEIGHT = 5;

function drawBar(
  term: Terminal,
  x: number,
  y: number,
  width: number,
  val: number,
  max: number,
  filled: number,
  empty: number,
  text: number
) {
  const label = `${Math.ceil(val)}/${max}`;
  const length = Math.floor((val / max) * width);

  term.drawHLine(x, y, width, " ", undefined, empty);
  if (length) term.drawHLine(x, y, length, " ", undefined, filled);
  term.drawCenteredString(x + width / 2, y, label, text);
}

function drawWeaponInfo(term: Terminal, x: number, y: number, turret: Turret) {
  term.drawString(x, y, turret.name);

  const state = getState(turret);
  if (state === "Reloading") {
    term.drawString(x, y + 1, `Reloading (${turret.timer})`, Colors.LIGHT_RED);
    return;
  }

  const ammo = `${turret.salvo}/${turret.salvoCount}`;
  term.drawString(x, y + 1, ammo, Colors.YELLOW);

  if (state === "Chambering")
    term.drawString(x + ammo.length, y + 1, ` (${turret.timer})`, Colors.BROWN);
}

export default function addHUD(g: Engine) {
  const { mapHeight, term } = g;

  g.on("draw", () => {
    const player = g.player;

    // term.drawHLine(0, startY, term.width, Glyphs.BoxHorizontalSingle);
    term.fillRect(0, mapHeight, term.width, HUD_HEIGHT, " ");
    term.drawSingleBox(0, mapHeight, term.width, HUD_HEIGHT);

    let x = 1;
    const y = mapHeight + 1;
    const name = `${player.pilot!.name} in ${player.ship!.name}`;
    const barLength = Math.max(10, name.length - 3);
    term.drawString(x, y, name);
    term.drawString(x, y + 1, "HP:");
    drawBar(
      term,
      x + 3,
      y + 1,
      barLength,
      player.ship!.hp,
      player.ship!.maxHp,
      Colors.DARK_GREEN,
      Colors.DARK_RED,
      Colors.WHITE
    );

    x += barLength + 4;
    term.drawChar(x - 1, y - 1, Glyphs.BoxDownSingleHorizontalSingle);
    term.drawVLine(x - 1, y, HUD_HEIGHT - 2, Glyphs.BoxVerticalSingle);
    term.drawChar(
      x - 1,
      y + HUD_HEIGHT - 2,
      Glyphs.BoxUpSingleHorizontalSingle
    );

    for (const tag of player.player!.weaponArrays) {
      const weapons = getEntityTree(g, player).filter((e) => e.turret);
      let wx = x;
      for (const weapon of weapons) {
        drawWeaponInfo(term, wx, y + 1, weapon.turret!);
        wx += 15;
      }

      term.drawString(
        x,
        y,
        `${tag} ${pluralise("Weapon", weapons.length)}`,
        Colors.LIGHT_CYAN
      );
    }
  });
}
