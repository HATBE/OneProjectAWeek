import Renderable from "../../engine/rendering/Renderable";

export default class Entity implements Renderable {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;
  private speed;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    speed: number = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getColor(): string {
    return this.color;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }
}
