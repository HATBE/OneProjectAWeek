import AlertCommand from "./AlertCommand";
import ClearCommand from "./ClearCommand";
import AbstractCommand from "./AbstractCommand";
import EchoCommand from "./EchoCommand";
import HelpCommand from "./HelpCommand";
import JokeCommand from "./JokeCommand";
import OpenCommand from "./OpenCommand";
import TimeCommand from "./TimeCommand";
import Console from "../Console";

type CommandArrayItem = {
  name: string;
  command: AbstractCommand;
};

export default class CommandsHandler {
  private console: Console;
  private commands: CommandArrayItem[] = [];

  public constructor(console: Console) {
    this.console = console;
    this.registerCommands();
  }

  public registerCommands() {
    this.registerCommand(
      "help",
      new HelpCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "clear",
      new ClearCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "echo",
      new EchoCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "alert",
      new AlertCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "joke",
      new JokeCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "open",
      new OpenCommand(this.console.getConsoleOutputManager(), this)
    );
    this.registerCommand(
      "time",
      new TimeCommand(this.console.getConsoleOutputManager(), this)
    );
  }

  public registerCommand(name: string, comandClass: AbstractCommand): void {
    this.commands.push({ name, command: comandClass });
  }

  public isCommand(name: string): boolean {
    const cmd = this.commands.find((cmd) => cmd.name === name);

    // ts, why cant i just return cmd? WHY????
    return cmd ? true : false;
  }

  public getCommands(): CommandArrayItem[] {
    return this.commands;
  }

  public handleCommand(textInput: string) {
    const cmdStrg: string[] = textInput.split(" ");
    const command: string = cmdStrg[0];
    cmdStrg.shift();
    let args: string[] = [];
    if (cmdStrg) {
      args = cmdStrg;
    }

    const cmd = this.commands.find((cmd) => cmd.name === command);

    if (!cmd) {
      this.console.getConsoleOutputManager().addLine(`> ${command} ${args.join(" ")}`);
      this.console.getConsoleOutputManager().addLine(
        `Sorry! Command "${command}" not known!`
      );
      return;
    }

    if (cmd.command.doShowCommand()) {
      this.console.getConsoleOutputManager().addLine(`> ${command} ${args.join(" ")}`);
    }

    cmd.command.execute(command, args);
  }
}
