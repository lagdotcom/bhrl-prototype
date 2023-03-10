import Glyphs from "@app/logic/glyphs";
import Layer from "@app/types/Layer";
import Prefab from "@app/types/Prefab";

export const BombItem: Prefab = {
  components: {
    appearance: { glyph: Glyphs.DoubleNote, layer: Layer.Item },
    item: { type: "bomb", prefab: "BombItem" },
  },
};

export const DoubleItem: Prefab = {
  components: {
    appearance: { glyph: Glyphs.Squared, layer: Layer.Item },
    item: { type: "double" },
  },
};

export const DrainItem: Prefab = {
  components: {
    appearance: { glyph: "%", layer: Layer.Item },
    item: { type: "drain" },
  },
};

export const HealItem: Prefab = {
  components: {
    appearance: { glyph: Glyphs.Heart, layer: Layer.Item },
    item: { type: "heal" },
  },
};

export const JunkItem: Prefab = {
  components: {
    appearance: { glyph: Glyphs.Beta, layer: Layer.Item },
    item: { type: "junk" },
  },
};

export const MoneyItem: Prefab = {
  components: {
    appearance: { glyph: Glyphs.SetMember, layer: Layer.Item },
    item: { type: "money", value: 0 },
  },
};

export const RechargeItem: Prefab = {
  components: {
    appearance: { glyph: "@", layer: Layer.Item },
    item: { type: "recharge" },
  },
};
