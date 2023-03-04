import Angles from "@app/logic/angles";
import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { makeTurret } from "@app/components";

export const MachineGun: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.WHITE },
    turret: makeTurret("Machine Gun", Angles.Down, {
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
    turret: makeTurret("Homing Missile", "nearestEnemy", {
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
    turret: makeTurret("Pea Shooter", Angles.Down, {
      bulletPrefab: "Bullet",
      bulletVelocity: 2,
      salvoCount: 1,
      timeBetweenSalvos: 3,
    }),
  },
};

export const PlayerGun: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.WHITE },
    turret: makeTurret("Pew Pew", Angles.Up, {
      bulletPrefab: "PlayerBullet",
      bulletVelocity: 2,
      salvoCount: 2,
      timeBetweenShots: 0,
      timeBetweenSalvos: 3,
    }),
  },
};
