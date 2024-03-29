import Engine from "@app/Engine";
import { entityHasComponents, getEntityTree } from "@app/logic/entity";
import Glyphs from "@app/logic/glyphs";
import BombsInfo from "@app/ui/BombsInfo";
import PilotInfo from "@app/ui/PilotInfo";
import ShipInfo from "@app/ui/ShipInfo";
import WeaponInfo from "@app/ui/WeaponInfo";
import { Colors } from "wglt";

export const HUD_HEIGHT = 6;

export default function addHUD(g: Engine) {
  const { mapHeight, term } = g;

  g.on("draw", function DrawHUD() {
    const pe = g.player;
    const { pilot, player, ship } = pe;

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

    const shipInfo = new ShipInfo(g, ship);
    shipInfo.draw(x, y);

    const statX = x + Math.floor((shipInfo.width - 11) / 2);
    const pilotInfo = new PilotInfo(g, pilot, false);
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

    for (const tag of player.weaponArrays) {
      const sx = x;
      const weapons = getEntityTree(g, pe)
        .filter((e) => e.tags.has(tag))
        .filter(entityHasComponents(["turret"]));
      for (const weapon of weapons) {
        const weaponInfo = new WeaponInfo(g, weapon.turret);
        weaponInfo.draw(x, y + 1);
        x += weaponInfo.width + 1;
      }

      term.drawString(sx, y, tag, Colors.LIGHT_CYAN);

      x = Math.max(x, sx + tag.length + 1);
    }

    if (player.bombs.length) {
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

      const bi = new BombsInfo(g, player);
      bi.draw(x, y);
    }
  });
}
