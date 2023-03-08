import { Pilot, Position } from "@app/components";

import AttackWave from "@app/types/AttackWave";
import DamageSource from "@app/types/DamageSource";
import Entity from "@app/Entity";
import KillReason from "@app/types/KillReason";

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
  "waveBegin",
] as const;
export type EventName = (typeof EventNames)[number];

export type EventMap = {
  damage: { e: Entity; amount: number; source: DamageSource };
  draw: undefined;
  kill: { e: Entity; reason: KillReason };
  move: { e: Entity; old: Position; pos: Position };
  notice: { e: Entity; noticed: Entity };
  playerFire: { array: number };
  playerMove: { move: Position };
  spawn: { e: Entity };
  tick: undefined;
  waveBegin: { wave: AttackWave; difficulty: number; pilot?: Pilot };
};

export type EventCallback<T extends EventName> = (data: EventMap[T]) => void;

export type EventHandler = {
  fire<T extends EventName>(name: T, data: EventMap[T]): void;
  on<T extends EventName>(name: T, cb: EventCallback<T>): void;
};
