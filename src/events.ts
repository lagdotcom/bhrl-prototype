import Entity from "@app/Entity";
import { Position } from "@app/components";

export type EventMap = {
  draw: undefined;
  kill: { e: Entity };
  move: { e: Entity; old: Position; pos: Position };
  spawn: { e: Entity };
  tick: undefined;
};

export type EventName = keyof EventMap;

export type EventCallback<T extends EventName> = (data: EventMap[T]) => void;

export type EventHandler = {
  fire<T extends EventName>(name: T, data: EventMap[T]): void;
  on<T extends EventName>(name: T, cb: EventCallback<T>): void;
};
