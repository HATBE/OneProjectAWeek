import Renderable from "./Renderable";

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  private height: number;
  private width: number;

  public constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const context = canvas.getContext("2d");

    if (!context) {
      alert("NO CONTEXT FOUND");
      return;
    }

    this.context = context;
  }

  // TODO: currently just squares supported, change later to sprite!
  public drawRenderable(renderable: Renderable): void {
    this.drawRect(
      renderable.getX(),
      renderable.getY(),
      renderable.getWidth(),
      renderable.getHeight(),
      renderable.getColor()
    );
  }

  public drawBackground(color: string): void {
    this.drawRect(0, 0, this.getWidth(), this.getHeight(), color);
  }

  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "black"
  ): void {
    this.getContext().fillStyle = color;
    this.getContext().fillRect(x, y, width, height);
  }

  public drawDashedLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    dashSize: number,
    color: string = "black"
  ): void {
    this.getContext().fillStyle = color;
    this.getContext().setLineDash([dashSize, dashSize]);
    this.getContext().strokeStyle = color;
    this.getContext().beginPath();
    this.getContext().moveTo(fromX, fromY);
    this.getContext().lineTo(toX, toY);
    this.getContext().stroke();
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getXCenter(): number {
    return this.width / 2;
  }

  public getYCenter(): number {
    return this.height / 2;
  }

  public clear(): void {
    this.getContext().clearRect(0, 0, this.width, this.height);
  }

  // TODO: renderAdapter so that you dont have to give the context,so you count change the rendering output
}
