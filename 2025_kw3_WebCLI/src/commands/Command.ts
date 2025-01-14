export default abstract class Command {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract usage: string;

  public abstract handle(args: string[]): void;

  public getName(): string {
    return this.name;
  }

  public register() {
    alert(this.name);
  }

  public getUsage() {
    return this.usage;
  }

  public getDescription() {
    return this.description;
  }
}
