import { Position, Ship, Turret } from "@app/components";

import Entity from "@app/Entity";

export const EventNames = [
  "damage",
  "draw",
  "kill",
  "move",
  "notice",
  "playerFire",
  "playerMove",
  "spawn",
  "tick",
] as const;
export type EventName = (typeof EventNames)[number];

export type DamageSource = {
  e: Entity;
  owner: Entity;
  ship?: Ship;
  turret?: Turret;
};

export type EventMap = {
  damage: { e: Entity; amount: number; source: DamageSource };
  draw: undefined;
  kill: { e: Entity; source?: DamageSource };
  move: { e: Entity; old: Position; pos: Position };
  notice: { e: Entity; noticed: Entity };
  playerFire: { array: number };
  playerMove: { move: Position };
  spawn: { e: Entity };
  tick: undefined;
};

export type EventCallback<T extends EventName> = (data: EventMap[T]) => void;

export type EventHandler = {
  fire<T extends EventName>(name: T, data: EventMap[T]): void;
  on<T extends EventName>(name: T, cb: EventCallback<T>): void;
};
