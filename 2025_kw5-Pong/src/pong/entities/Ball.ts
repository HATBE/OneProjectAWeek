import Entity from "./Entity";

export default class Ball extends Entity {
  private dx = 0;
  private dy = 0;

  public constructor(x: number, y: number) {
    super(x, y, 10, 10, "white", 3);
  }

  public getDx(): number {
    return this.dx;
  }

  public getDy(): number {
    return this.dy;
  }

  public setDx(dx: number): void {
    this.dx = dx;
  }

  public setDy(dy: number): void {
    this.dy = dy;
  }
}
