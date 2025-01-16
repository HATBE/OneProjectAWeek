import ConsoleOutputManager from "../ConsoleOutputManager";
import CommandsHandler from "./CommandsHandler";

export default abstract class AbstractCommand {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract usage: string;

  protected showCommand: boolean = true;

  protected consoleOutputManager: ConsoleOutputManager;
  protected commandsHandler: CommandsHandler;

  public constructor(
    consoleOutputManager: ConsoleOutputManager,
    commandsHandler: CommandsHandler
  ) {
    this.consoleOutputManager = consoleOutputManager;
    this.commandsHandler = commandsHandler;
  }

  protected abstract handle(args: string[]): void;

  public execute(cmd: string, args: string[]): void {
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

  public doShowCommand(): boolean {
    return this.showCommand;
  }
}
