import Entity from "./Entity";

export default class Pedal extends Entity {
  public constructor(x: number, y: number) {
    super(x, y, 10, 90, "white", 4);
  }

  public setX(x: number) {
    return; // can't set X
  }
}
