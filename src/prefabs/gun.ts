import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { makeTurret } from "@app/components";

export const MachineGun: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.WHITE },
    turret: makeTurret({
      bulletPrefab: "Bullet",
      bulletVelocity: 2,
      salvoCount: 5,
      timeBetweenShots: 0,
      timeBetweenSalvos: 12,
    }),
  },
};

export const HomingMissileLauncher: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.YELLOW },
    turret: makeTurret({
      bulletPrefab: "HomingMissile",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenSalvos: 8,
    }),
  },
};

export const PeaShooter: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.LIGHT_GRAY },
    turret: makeTurret({
      bulletPrefab: "Bullet",
      bulletVelocity: 2,
      salvoCount: 1,
      timeBetweenSalvos: 3,
    }),
  },
};
