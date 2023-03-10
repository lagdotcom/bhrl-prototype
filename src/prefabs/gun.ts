import { array, bullet, turret } from "@app/prefabs/tools";

import Angles from "@app/logic/angles";
import Offsets from "@app/logic/offsets";
import Prefab from "@app/types/Prefab";

export const PeaShooter: Prefab = {
  components: {
    turret: turret("Main Gun", { salvoCount: 1, timeBetweenSalvos: 3 }, [
      bullet("Bullet", "Bullet", Angles.Down, 2, { canDouble: true }),
    ]),
  },
};

export const PlayerGun: Prefab = {
  components: {
    turret: turret(
      "Main Gun",
      { salvoCount: 2, timeBetweenShots: 0, timeBetweenSalvos: 3 },
      [bullet("Your Bullet", "PlayerBullet", Angles.Up, 2, { canDouble: true })]
    ),
  },
};

export const Cleave: Prefab = {
  components: {
    turret: turret("Cleave", { salvoCount: 1, timeBetweenSalvos: 11 }, [
      array("Primary"),
      array("Primary", { delay: 1 }),
      array("Primary", { delay: 2 }),
      array("Primary", { delay: 3 }),
      array("Primary", { delay: 4 }),
    ]),
  },
};

export const Outcry: Prefab = {
  components: {
    turret: turret("Outcry", { salvoCount: 1, timeBetweenSalvos: 8 }, [
      bullet("Outcry", "OutcryBullet", Angles.DownLeft, 2),
      bullet("Outcry", "OutcryBullet", Angles.Left, 2),
      bullet("Outcry", "OutcryBullet", Angles.UpLeft, 2),
      bullet("Outcry", "OutcryBullet", Angles.Up, 2),
      bullet("Outcry", "OutcryBullet", Angles.UpRight, 2),
      bullet("Outcry", "OutcryBullet", Angles.Right, 2),
      bullet("Outcry", "OutcryBullet", Angles.DownRight, 2),
    ]),
  },
};

export const AcidSplash: Prefab = {
  components: {
    turret: turret("Acid Splash", { salvoCount: 1, timeBetweenSalvos: 13 }, [
      bullet("Acid Splash", "AcidBullet", Angles.UpLeft, 2),
      bullet("Acid Splash", "AcidBullet", Angles.UpRight, 2),
      bullet("Acid Splash", "AcidBullet", Angles.Left, 2, { delay: 1 }),
      bullet("Acid Splash", "AcidBullet", Angles.Right, 2, { delay: 1 }),
      bullet("Acid Splash", "AcidBullet", Angles.DownLeft, 2, { delay: 2 }),
      bullet("Acid Splash", "AcidBullet", Angles.DownRight, 2, { delay: 2 }),
      bullet("Acid Splash", "AcidBullet", Angles.Left, 2, { delay: 3 }),
      bullet("Acid Splash", "AcidBullet", Angles.Right, 2, { delay: 3 }),
      bullet("Acid Splash", "AcidBullet", Angles.UpLeft, 2, { delay: 4 }),
      bullet("Acid Splash", "AcidBullet", Angles.UpRight, 2, { delay: 4 }),
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
    turret: turret("Talon Swipe", { salvoCount: 1, timeBetweenSalvos: 10 }, [
      bullet("Talon Swipe", "TalonBullet", Angles.Left, 2),
      bullet("Talon Swipe", "TalonBullet", Angles.Right, 2),
      bullet("Talon Swipe", "TalonBullet", Angles.Left, 2, { delay: 1 }),
      bullet("Talon Swipe", "TalonBullet", Angles.Right, 2, { delay: 1 }),
      bullet("Talon Swipe", "TalonBullet", Angles.Left, 2, { delay: 2 }),
      bullet("Talon Swipe", "TalonBullet", Angles.Right, 2, { delay: 2 }),
    ]),
  },
};

export const CrushPattern: Prefab = {
  components: {
    turret: turret("Crush Pattern", { salvoCount: 1, timeBetweenSalvos: 15 }, [
      bullet("Crush Pattern", "CrushBullet", Angles.Left, 1),
      bullet("Crush Pattern", "CrushBullet", Angles.UpLeft, 1),
      bullet("Crush Pattern", "CrushBullet", Angles.UpRight, 1),
      bullet("Crush Pattern", "CrushBullet", Angles.Right, 1),
    ]),
  },
};

export const Smite: Prefab = {
  components: {
    turret: turret("Smite", { salvoCount: 1, timeBetweenSalvos: 16 }, [
      bullet("Smite", "SmiteMissile", Angles.Right, 1),
      bullet("Smite", "SmiteMissile", Angles.Right, 1, { delay: 1 }),
    ]),
  },
};

export const DroneGun: Prefab = {
  components: {
    turret: turret(
      "Stinger",
      { salvoCount: 1, timeBetweenSalvos: 5, ammunition: 5 },
      [bullet("Bullet", "DroneBullet", "nearestEnemy", 1, { canDouble: true })]
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
      bullet("Bellow", "BellowMissile", Angles.DownLeft, 1),
      array("Primary"),
      array("Primary", { delay: 1 }),
      array("Primary", { delay: 2 }),
      array("Primary", { delay: 3 }),
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
