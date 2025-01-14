import ConsoleOutputStorage from "../ConsoleOutputStorage";

export default abstract class Command {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract usage: string;

  protected abstract handle(args: string[]): void;

  public execute(cmd: string, args: string[]): void {
    ConsoleOutputStorage.getInstance().addLine(`> ${cmd} ${args.join(" ")}`);
    this.handle(args);
  }

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
