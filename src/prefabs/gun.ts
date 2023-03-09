import { bullet, turret } from "@app/prefabs/tools";

import Angles from "@app/logic/angles";
import Prefab from "@app/types/Prefab";

export const PeaShooter: Prefab = {
  components: {
    turret: turret("Pea Shooter", { salvoCount: 1, timeBetweenSalvos: 3 }, [
      bullet("Bullet", "Bullet", Angles.Down, 2),
    ]),
  },
};

export const PlayerGun: Prefab = {
  components: {
    turret: turret(
      "Pew Pew",
      { salvoCount: 2, timeBetweenShots: 0, timeBetweenSalvos: 3 },
      [bullet("Your Bullet", "PlayerBullet", Angles.Up, 2)]
    ),
  },
};

export const DroneGun: Prefab = {
  components: {
    turret: turret(
      "Stinger",
      { salvoCount: 1, timeBetweenSalvos: 5, ammunition: 5 },
      [bullet("Bullet", "DroneBullet", "nearestEnemy", 1)]
    ),
  },
};

export const OlmSpray: Prefab = {
  components: {
    turret: turret("Deployment", { salvoCount: 1, timeBetweenSalvos: 12 }, [
      bullet("Drone", "DroneA", Angles.Up, 0, { x: 0, y: -1 }),
      bullet("Missile", "HomingMissile", Angles.DownLeft, 2, { x: -1, y: 1 }),
      bullet("Missile", "HomingMissile", Angles.DownRight, 2, { x: 1, y: 1 }),
    ]),
  },
};
