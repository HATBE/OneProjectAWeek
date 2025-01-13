export default abstract class Command {
  protected abstract name: string;
  protected args: string[];

  public constructor(args: string[]) {
    this.args = args;
    this.handle();
  }

  public abstract handle(): void;

  public getName(): string {
    return this.name;
  }
}
