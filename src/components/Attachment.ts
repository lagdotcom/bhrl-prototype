import Entity from "../Entity";

export default class Attachment {
  constructor(public parent: Entity, public x: number, public y: number) {}
}
