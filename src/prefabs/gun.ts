import Offsets from "@app/logic/offsets";
import { aim, array, bullet, rel, turret } from "@app/prefabs/tools";
import Prefab from "@app/types/Prefab";

export const PeaShooter: Prefab = {
  components: {
    turret: turret("Main Gun", { salvoCount: 1, timeBetweenSalvos: 3 }, [
      bullet("Bullet", "Bullet", rel("F"), 2, { canDouble: true }),
    ]),
  },
};

export const PlayerGun: Prefab = {
  components: {
    turret: turret(
      "Main Gun",
      { salvoCount: 2, timeBetweenShots: 0, timeBetweenSalvos: 3 },
      [bullet("Your Bullet", "PlayerBullet", rel("F"), 2, { canDouble: true })]
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
      bullet("Outcry", "OutcryBullet", rel("FR"), 2),
      bullet("Outcry", "OutcryBullet", rel("R"), 2),
      bullet("Outcry", "OutcryBullet", rel("BR"), 2),
      bullet("Outcry", "OutcryBullet", rel("B"), 2),
      bullet("Outcry", "OutcryBullet", rel("BL"), 2),
      bullet("Outcry", "OutcryBullet", rel("L"), 2),
      bullet("Outcry", "OutcryBullet", rel("FL"), 2),
    ]),
  },
};

export const AcidSplash: Prefab = {
  components: {
    turret: turret("Acid Splash", { salvoCount: 1, timeBetweenSalvos: 13 }, [
      bullet("Acid Splash", "AcidBullet", rel("BR"), 2),
      bullet("Acid Splash", "AcidBullet", rel("BL"), 2),
      bullet("Acid Splash", "AcidBullet", rel("R"), 2, { delay: 1 }),
      bullet("Acid Splash", "AcidBullet", rel("L"), 2, { delay: 1 }),
      bullet("Acid Splash", "AcidBullet", rel("FR"), 2, { delay: 2 }),
      bullet("Acid Splash", "AcidBullet", rel("FL"), 2, { delay: 2 }),
      bullet("Acid Splash", "AcidBullet", rel("R"), 2, { delay: 3 }),
      bullet("Acid Splash", "AcidBullet", rel("L"), 2, { delay: 3 }),
      bullet("Acid Splash", "AcidBullet", rel("BR"), 2, { delay: 4 }),
      bullet("Acid Splash", "AcidBullet", rel("BL"), 2, { delay: 4 }),
    ]),
  },
};

export const ShuttleLaunch: Prefab = {
  components: {
    turret: turret("Shuttle Launch", { salvoCount: 1, timeBetweenSalvos: 27 }, [
      bullet("Runabout", "DroneA", rel("R"), 0, { offset: Offsets.Left }),
      bullet("Runabout", "DroneA", rel("L"), 0, { offset: Offsets.Right }),
    ]),
  },
};

export const Veto: Prefab = {
  components: {
    turret: turret("Veto", { salvoCount: 1, timeBetweenSalvos: 21 }, [
      bullet("Veto", "HomingMissile", rel("B"), 1),
      bullet("Wasp", "DroneB", rel("FL"), 0, {
        offset: Offsets.DownRight,
      }),
    ]),
  },
};

export const TalonSwipe: Prefab = {
  components: {
    turret: turret("Talon Swipe", { salvoCount: 1, timeBetweenSalvos: 10 }, [
      bullet("Talon Swipe", "TalonBullet", rel("R"), 2),
      bullet("Talon Swipe", "TalonBullet", rel("L"), 2),
      bullet("Talon Swipe", "TalonBullet", rel("R"), 2, { delay: 1 }),
      bullet("Talon Swipe", "TalonBullet", rel("L"), 2, { delay: 1 }),
      bullet("Talon Swipe", "TalonBullet", rel("R"), 2, { delay: 2 }),
      bullet("Talon Swipe", "TalonBullet", rel("L"), 2, { delay: 2 }),
    ]),
  },
};

export const CrushPattern: Prefab = {
  components: {
    turret: turret("Crush Pattern", { salvoCount: 1, timeBetweenSalvos: 15 }, [
      bullet("Crush Pattern", "CrushBullet", rel("R"), 1),
      bullet("Crush Pattern", "CrushBullet", rel("BR"), 1),
      bullet("Crush Pattern", "CrushBullet", rel("BL"), 1),
      bullet("Crush Pattern", "CrushBullet", rel("L"), 1),
    ]),
  },
};

export const Smite: Prefab = {
  components: {
    turret: turret("Smite", { salvoCount: 1, timeBetweenSalvos: 16 }, [
      bullet("Smite", "SmiteMissile", rel("L"), 1),
      bullet("Smite", "SmiteMissile", rel("L"), 1, { delay: 1 }),
    ]),
  },
};

export const DroneGun: Prefab = {
  components: {
    turret: turret(
      "Stinger",
      { salvoCount: 1, timeBetweenSalvos: 5, ammunition: 5 },
      [bullet("Bullet", "DroneBullet", aim, 1, { canDouble: true })]
    ),
  },
};

export const Salvo: Prefab = {
  components: {
    turret: turret("Salvo", { salvoCount: 1, timeBetweenSalvos: 10 }, [
      bullet("Missile", "SalvoMissileA", rel("BR"), 1),
      bullet("Missile", "SalvoMissileB", rel("BR"), 1),
      bullet("Missile", "SalvoMissileC", rel("BR"), 1),
    ]),
  },
};

export const TheDragonWakes: Prefab = {
  components: {
    turret: turret(
      "The Dragon Wakes",
      { salvoCount: 1, timeBetweenSalvos: 12 },
      [
        bullet("Drone", "DroneA", rel("B"), 0, { offset: Offsets.Up }),
        bullet("Missile", "HomingMissile", rel("FR"), 2, {
          offset: Offsets.DownLeft,
        }),
        bullet("Missile", "HomingMissile", rel("FL"), 2, {
          offset: Offsets.DownRight,
        }),
      ]
    ),
  },
};

export const Bellow: Prefab = {
  components: {
    turret: turret("Bellow", { salvoCount: 1, timeBetweenSalvos: 17 }, [
      bullet("Bellow", "BellowMissile", rel("FR"), 1),
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
      bullet("Pulsar", "DroneC", rel("FR"), 0, {
        offset: Offsets.DownLeft,
      }),
      bullet("Pulsar", "DroneC", rel("BR"), 0, {
        offset: Offsets.UpLeft,
      }),
      bullet("Pulsar", "DroneC", rel("BL"), 0, {
        offset: Offsets.UpRight,
      }),
      bullet("Pulsar", "DroneC", rel("FL"), 0, {
        offset: Offsets.DownRight,
      }),
    ]),
  },
};
