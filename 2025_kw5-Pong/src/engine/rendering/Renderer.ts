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

  public draw(): void {
    this.context.fillStyle = "red";
    this.context.fillRect(0, 0, this.height, this.width);
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
