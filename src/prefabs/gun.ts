import { bullet, turret } from "@app/prefabs/tools";

import Angles from "@app/logic/angles";
import Offsets from "@app/logic/offsets";
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

export const Cleave: Prefab = {
  components: {
    turret: turret("Cleave", { salvoCount: 5, timeBetweenSalvos: 11 }, [
      bullet("Cleave", "Bullet", Angles.Down, 2),
    ]),
  },
};

export const Outcry: Prefab = {
  components: {
    turret: turret("Outcry", { salvoCount: 1, timeBetweenSalvos: 8 }, [
      bullet("Outcry", "Bullet", Angles.DownLeft, 2),
      bullet("Outcry", "Bullet", Angles.Left, 2),
      bullet("Outcry", "Bullet", Angles.UpLeft, 2),
      bullet("Outcry", "Bullet", Angles.Up, 2),
      bullet("Outcry", "Bullet", Angles.UpRight, 2),
      bullet("Outcry", "Bullet", Angles.Right, 2),
      bullet("Outcry", "Bullet", Angles.DownRight, 2),
    ]),
  },
};

export const AcidSplash: Prefab = {
  components: {
    turret: turret("Acid Splash", { salvoCount: 1, timeBetweenSalvos: 13 }, [
      bullet("Acid Splash", "Bullet", Angles.UpLeft, 2),
      bullet("Acid Splash", "Bullet", Angles.UpRight, 2),
      bullet("Acid Splash", "Bullet", Angles.Left, 2, { delay: 1 }),
      bullet("Acid Splash", "Bullet", Angles.Right, 2, { delay: 1 }),
      bullet("Acid Splash", "Bullet", Angles.DownLeft, 2, { delay: 2 }),
      bullet("Acid Splash", "Bullet", Angles.DownRight, 2, { delay: 2 }),
      bullet("Acid Splash", "Bullet", Angles.Left, 2, { delay: 3 }),
      bullet("Acid Splash", "Bullet", Angles.Right, 2, { delay: 3 }),
      bullet("Acid Splash", "Bullet", Angles.UpLeft, 2, { delay: 4 }),
      bullet("Acid Splash", "Bullet", Angles.UpRight, 2, { delay: 4 }),
    ]),
  },
};

export const ShuttleLaunch: Prefab = {
  components: {
    turret: turret("Shuttle Launch", { salvoCount: 1, timeBetweenSalvos: 27 }, [
      bullet("Runabout", "DroneA", Angles.Left, 0, { offset: Offsets.Left }),
      bullet("Runabout", "DroneA", Angles.Right, 0, { offset: Offsets.Right }),
    ]),
  },
};

export const Veto: Prefab = {
  components: {
    turret: turret("Veto", { salvoCount: 1, timeBetweenSalvos: 21 }, [
      bullet("Veto", "HomingMissile", Angles.Up, 1),
      bullet("Wasp", "DroneB", Angles.DownRight, 0, {
        offset: Offsets.DownRight,
      }),
    ]),
  },
};

export const TalonSwipe: Prefab = {
  components: {
    turret: turret("Talon Swipe", { salvoCount: 3, timeBetweenSalvos: 10 }, [
      bullet("Talon Swipe", "Bullet", Angles.Left, 2),
      bullet("Talon Swipe", "Bullet", Angles.Right, 2),
    ]),
  },
};

export const CrushPattern: Prefab = {
  components: {
    turret: turret("Crush Pattern", { salvoCount: 1, timeBetweenSalvos: 15 }, [
      bullet("Crush Pattern", "HomingBullet", Angles.Left, 1),
      bullet("Crush Pattern", "HomingBullet", Angles.UpLeft, 1),
      bullet("Crush Pattern", "HomingBullet", Angles.UpRight, 1),
      bullet("Crush Pattern", "HomingBullet", Angles.Right, 1),
    ]),
  },
};

export const Smite: Prefab = {
  components: {
    turret: turret("Smite", { salvoCount: 2, timeBetweenSalvos: 16 }, [
      bullet("Smite", "SmiteMissile", Angles.Right, 1),
    ]),
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

export const Salvo: Prefab = {
  components: {
    turret: turret("Salvo", { salvoCount: 1, timeBetweenSalvos: 10 }, [
      bullet("Missile", "SalvoMissileA", Angles.UpLeft, 1),
      bullet("Missile", "SalvoMissileB", Angles.UpLeft, 1),
      bullet("Missile", "SalvoMissileC", Angles.UpLeft, 1),
    ]),
  },
};

export const TheDragonWakes: Prefab = {
  components: {
    turret: turret(
      "The Dragon Wakes",
      { salvoCount: 1, timeBetweenSalvos: 12 },
      [
        bullet("Drone", "DroneA", Angles.Up, 0, { offset: Offsets.Up }),
        bullet("Missile", "HomingMissile", Angles.DownLeft, 2, {
          offset: Offsets.DownLeft,
        }),
        bullet("Missile", "HomingMissile", Angles.DownRight, 2, {
          offset: Offsets.DownRight,
        }),
      ]
    ),
  },
};

export const Bellow: Prefab = {
  components: {
    turret: turret("Bellow", { salvoCount: 1, timeBetweenSalvos: 17 }, [
      bullet("Missile", "BellowMissile", Angles.DownLeft, 1),
      bullet("Bullet", "Bullet", Angles.Down, 2),
      bullet("Bullet", "Bullet", Angles.Down, 2, { delay: 1 }),
      bullet("Bullet", "Bullet", Angles.Down, 2, { delay: 2 }),
      bullet("Bullet", "Bullet", Angles.Down, 2, { delay: 3 }),
    ]),
  },
};

export const DemandHomage: Prefab = {
  components: {
    turret: turret("Demand Homage", { salvoCount: 1, timeBetweenSalvos: 21 }, [
      bullet("Pulsar", "DroneC", Angles.DownLeft, 0, {
        offset: Offsets.DownLeft,
      }),
      bullet("Pulsar", "DroneC", Angles.UpLeft, 0, {
        offset: Offsets.UpLeft,
      }),
      bullet("Pulsar", "DroneC", Angles.UpRight, 0, {
        offset: Offsets.UpRight,
      }),
      bullet("Pulsar", "DroneC", Angles.DownRight, 0, {
        offset: Offsets.DownRight,
      }),
    ]),
  },
};
