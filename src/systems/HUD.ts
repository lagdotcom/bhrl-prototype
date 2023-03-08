import { Colors } from "wglt";
import Engine from "@app/Engine";
import Glyphs from "@app/logic/glyphs";
import PilotInfo from "@app/ui/PilotInfo";
import ShipInfo from "@app/ui/ShipInfo";
import WeaponInfo from "@app/ui/WeaponInfo";
import { getEntityTree } from "@app/logic/entity";
import pluralise from "@app/tools/pluralise";

export const HUD_HEIGHT = 6;

export default function addHUD(g: Engine) {
  const { mapHeight, term } = g;

  g.on("draw", function DrawHUD() {
    const player = g.player;
    const { pilot, ship } = player;

    term.fillRect(
      0,
      mapHeight,
      term.width,
      HUD_HEIGHT,
      " ",
      Colors.WHITE,
      Colors.BLACK
    );
    term.drawSingleBox(0, mapHeight, term.width, HUD_HEIGHT);

    let x = 1;
    const y = mapHeight + 1;

    const shipInfo = new ShipInfo(g, ship!);
    shipInfo.draw(x, y);

    const statX = x + Math.floor((shipInfo.width - 11) / 2);
    const pilotInfo = new PilotInfo(g, pilot!, false);
    pilotInfo.draw(statX, y + 3);

    x += shipInfo.width + 1;
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

    let wx = x;
    for (const tag of player.player!.weaponArrays) {
      const sx = wx;
      const weapons = getEntityTree(g, player).filter(
        (e) => e.turret && e.tags.has(tag)
      );
      for (const weapon of weapons) {
        const weaponInfo = new WeaponInfo(g, weapon.turret!);
        weaponInfo.draw(wx, y + 1);
        wx += weaponInfo.width + 1;
      }

      term.drawString(sx, y, tag, Colors.LIGHT_CYAN);

      wx = Math.max(wx, sx + tag.length + 1);
    }
  });
}
