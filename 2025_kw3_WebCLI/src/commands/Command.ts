export default abstract class Command {
  protected abstract name: string;
  protected consoleText: string[];
  protected setConsoleText: (consoletext: string[]) => void;

  public constructor(
    consoleText: string[],
    setConsoleText: (consoletext: string[]) => void
  ) {
    this.consoleText = consoleText;
    this.setConsoleText = setConsoleText;
    this.handle();
  }

  public abstract handle(): void;

  public getName(): string {
    return this.name;
  }
}
