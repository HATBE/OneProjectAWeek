export default abstract class Command {
  protected abstract name: string;

  public constructor() {
    this.handle();
  }

  public abstract handle(): void;

  public getName(): string {
    return this.name;
  }
}
