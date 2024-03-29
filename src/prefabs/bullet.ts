import Glyphs from "@app/logic/glyphs";
import { pilotScale } from "@app/prefabs/tools";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";
import { Colors, fromRgb } from "wglt";

export const Bullet: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "body") },
    appearance: {
      glyph: Glyphs.InvertedExclamation,
      layer: Layer.Bullet,
      fg: Colors.YELLOW,
    },
  },
};

export const DroneBullet: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "body") },
    appearance: { glyph: ".", layer: Layer.Bullet, fg: Colors.ORANGE },
  },
};

export const OutcryBullet: Prefab = {
  components: {
    projectile: { damage: 6, scaling: pilotScale(6, "mind") },
    appearance: { glyph: "o", layer: Layer.Bullet, fg: fromRgb(255, 55, 135) },
  },
};

export const AcidBullet: Prefab = {
  components: {
    projectile: { damage: 6, scaling: pilotScale(6, "mind") },
    appearance: {
      glyph: Glyphs.Approximates,
      layer: Layer.Bullet,
      fg: fromRgb(55, 55, 215),
    },
  },
};

export const TalonBullet: Prefab = {
  components: {
    projectile: { damage: 6, scaling: pilotScale(6, "mind") },
    appearance: { glyph: "`", layer: Layer.Bullet, fg: fromRgb(135, 255, 55) },
  },
};

export const CrushBullet: Prefab = {
  components: {
    projectile: { damage: 6, scaling: pilotScale(6, "mind") },
    homing: { strength: 1, duration: 3 },
    appearance: {
      glyph: Glyphs.Square,
      layer: Layer.Bullet,
      fg: fromRgb(175, 175, 0),
    },
  },
};

export const SmiteMissile: Prefab = {
  components: {
    projectile: { damage: 2, scaling: pilotScale(2, "mind") },
    homing: { strength: 10, duration: 1 },
    explodes: { size: 7, type: "Fire", falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.ORANGE },
  },
};

export const HomingMissile: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "mind") },
    homing: { strength: 0.15, duration: 10 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 5, type: "Fire", falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};

export const SalvoMissileA: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "mind") },
    homing: { strength: 0.15, duration: 4 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 8, type: "Fire", falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};
export const SalvoMissileB: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "mind") },
    homing: { strength: 0.25, duration: 5 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 5, type: "Fire", falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};
export const SalvoMissileC: Prefab = {
  components: {
    projectile: { damage: 1, scaling: pilotScale(1, "mind") },
    homing: { strength: 0.35, duration: 8 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 4, type: "Fire", falloff: 1 },
    appearance: { glyph: "*", layer: Layer.Bullet, fg: Colors.DARK_RED },
  },
};

export const BellowMissile: Prefab = {
  components: {
    projectile: { damage: 20, scaling: pilotScale(20, "mind") },
    homing: { strength: 0.15, duration: 30 },
    trail: { effectPrefab: "SmokePuff" },
    explodes: { size: 6, type: "Fire", falloff: 1 },
    appearance: {
      glyph: Glyphs.CurlyF,
      layer: Layer.Bullet,
      fg: Colors.LIGHT_RED,
    },
  },
};

export const PlayerBullet: Prefab = {
  components: {
    projectile: { damage: 3, scaling: pilotScale(3, "body") },
    appearance: { glyph: "!", layer: Layer.PlayerBullet, fg: Colors.YELLOW },
  },
};
