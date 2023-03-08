import Angles from "@app/logic/angles";
import Prefab from "@app/types/Prefab";
import { turret } from "@app/prefabs/tools";

export const MachineGun: Prefab = {
  components: {
    turret: turret(
      "Machine Gun",
      { salvoCount: 5, timeBetweenShots: 0, timeBetweenSalvos: 12 },
      [{ prefab: "Bullet", angle: Angles.Down, vel: 2 }]
    ),
  },
};

export const HomingMissileLauncher: Prefab = {
  components: {
    turret: turret("Homing Missile", { salvoCount: 1, timeBetweenSalvos: 8 }, [
      { prefab: "HomingMissile", angle: "nearestEnemy", vel: 1 },
    ]),
  },
};

export const PeaShooter: Prefab = {
  components: {
    turret: turret("Pea Shooter", { salvoCount: 1, timeBetweenSalvos: 3 }, [
      { prefab: "Bullet", angle: Angles.Down, vel: 2 },
    ]),
  },
};

export const PlayerGun: Prefab = {
  components: {
    turret: turret(
      "Pew Pew",
      { salvoCount: 2, timeBetweenShots: 0, timeBetweenSalvos: 3 },
      [{ prefab: "PlayerBullet", angle: Angles.Up, vel: 2 }]
    ),
  },
};

export const DroneGun: Prefab = {
  components: {
    turret: turret(
      "Stinger",
      { salvoCount: 1, timeBetweenSalvos: 5, ammunition: 5 },
      [{ prefab: "DroneBullet", angle: "nearestEnemy", vel: 1 }]
    ),
  },
};

export const OlmSpray: Prefab = {
  components: {
    turret: turret("Deployment", { salvoCount: 1, timeBetweenSalvos: 12 }, [
      { prefab: "DroneA", angle: Angles.Up, vel: 0, offset: { x: 0, y: -1 } },
      {
        prefab: "HomingMissile",
        angle: Angles.DownLeft,
        vel: 2,
        offset: { x: -1, y: 1 },
      },
      {
        prefab: "HomingMissile",
        angle: Angles.DownRight,
        vel: 2,
        offset: { x: 1, y: 1 },
      },
    ]),
  },
};
