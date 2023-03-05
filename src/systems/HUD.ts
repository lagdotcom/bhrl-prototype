import { Colors, Terminal } from "wglt";
import { Pilot, Turret } from "@app/components";

import Engine from "@app/Engine";
import Glyphs from "@app/logic/glyphs";
import PilotStat from "@app/types/PilotStat";
import { StatColours } from "@app/logic/colours";
import { getEntityTree } from "@app/logic/entity";
import { getState } from "@app/logic/turret";
import pluralise from "@app/tools/pluralise";

export const HUD_HEIGHT = 6;

function drawBar(
  term: Terminal,
  x: number,
  y: number,
  width: number,
  val: number,
  max: number,
  filledBg: number,
  emptyBg: number,
  textFg: number
) {
  const label = `${Math.ceil(val)}/${max}`;
  const length = Math.floor((val / max) * width);

  term.drawHLine(x, y, width, " ", undefined, emptyBg);
  if (length) term.drawHLine(x, y, length, " ", undefined, filledBg);
  term.drawCenteredString(x + width / 2, y, label, textFg);
}

function drawWeaponInfo(term: Terminal, x: number, y: number, turret: Turret) {
  term.drawString(x, y, turret.name, Colors.WHITE);

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

function drawStat(
  term: Terminal,
  x: number,
  y: number,
  pilot: Pilot,
  stat: PilotStat
) {
  const value = pilot[stat];
  term.drawChar(x, y, stat[0].toUpperCase(), Colors.WHITE);
  term.drawChar(x + 1, y, value.toString(), StatColours[value]);
}

export default function addHUD(g: Engine) {
  const { mapHeight, term } = g;

  g.on("draw", () => {
    const player = g.player;
    const { pilot, ship } = player;

    term.fillRect(0, mapHeight, term.width, HUD_HEIGHT, " ");
    term.drawSingleBox(0, mapHeight, term.width, HUD_HEIGHT, Colors.WHITE);

    let x = 1;
    const y = mapHeight + 1;
    const name = ship!.name;
    const barLength = Math.max(10, name.length - 3);
    const sectionWidth = barLength + 3;
    term.drawString(x, y, name, Colors.WHITE);
    term.drawString(x, y + 1, "HP:", Colors.WHITE);
    drawBar(
      term,
      x + 3,
      y + 1,
      barLength,
      ship!.hp,
      ship!.maxHp,
      Colors.DARK_GREEN,
      Colors.DARK_RED,
      Colors.WHITE
    );

    term.drawString(x, y + 2, "Sh:", Colors.WHITE);
    drawBar(
      term,
      x + 3,
      y + 2,
      barLength,
      ship!.shield,
      ship!.maxShield,
      Colors.DARK_CYAN,
      Colors.LIGHT_BLUE,
      Colors.WHITE
    );

    const statX = x + Math.floor((sectionWidth - 11) / 2);
    drawStat(term, statX, y + 3, pilot!, "body");
    drawStat(term, statX + 3, y + 3, pilot!, "mind");
    drawStat(term, statX + 6, y + 3, pilot!, "spirit");
    drawStat(term, statX + 9, y + 3, pilot!, "talent");

    x += sectionWidth + 1;
    term.drawChar(
      x - 1,
      y - 1,
      Glyphs.BoxDownSingleHorizontalSingle,
      Colors.WHITE
    );
    term.drawVLine(
      x - 1,
      y,
      HUD_HEIGHT - 2,
      Glyphs.BoxVerticalSingle,
      Colors.WHITE
    );
    term.drawChar(
      x - 1,
      y + HUD_HEIGHT - 2,
      Glyphs.BoxUpSingleHorizontalSingle,
      Colors.WHITE
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
