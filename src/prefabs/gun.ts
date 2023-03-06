import Angles from "@app/logic/angles";
import { Colors } from "wglt";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { turret } from "@app/prefabs/tools";

export const MachineGun: Prefab = {
  components: {
    appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.WHITE },
    turret: turret("Machine Gun", Angles.Down, {
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
    turret: turret("Homing Missile", "nearestEnemy", {
      bulletPrefab: "HomingMissile",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenSalvos: 8,
    }),
  },
};

export const PeaShooter: Prefab = {
  components: {
    // appearance: { glyph: "o", layer: Layer.Gun, fg: Colors.LIGHT_GRAY },
    turret: turret("Pea Shooter", Angles.Down, {
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
    turret: turret("Pew Pew", Angles.Up, {
      bulletPrefab: "PlayerBullet",
      bulletVelocity: 2,
      salvoCount: 2,
      timeBetweenShots: 0,
      timeBetweenSalvos: 3,
    }),
  },
};

export const DroneGun: Prefab = {
  components: {
    turret: turret("Stinger", "nearestEnemy", {
      bulletPrefab: "DroneBullet",
      bulletVelocity: 1,
      salvoCount: 1,
      timeBetweenSalvos: 5,
      ammunition: 5,
    }),
  },
};
