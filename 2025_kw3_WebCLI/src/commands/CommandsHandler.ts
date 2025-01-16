import ConsoleOutputStorage from "../ConsoleOutputStorage";
import AlertCommand from "./AlertCommand";
import ClearCommand from "./ClearCommand";
import AbstractCommand from "./AbstractCommand";
import EchoCommand from "./EchoCommand";
import HelpCommand from "./HelpCommand";
import JokeCommand from "./JokeCommand";
import OpenCommand from "./OpenCommand";
import TimeCommand from "./TimeCommand";

type CommandArrayItem = {
  name: string;
  command: AbstractCommand;
};

export default class CommandsHandler {
  private consoleOutputStorage: ConsoleOutputStorage;
  private commands: CommandArrayItem[] = [];

  public constructor(consoleOutputStorage: ConsoleOutputStorage) {
    this.consoleOutputStorage = consoleOutputStorage;
    this.registerCommands();
  }

  public registerCommands() {
    this.registerCommand(
      "help",
      new HelpCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "clear",
      new ClearCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "echo",
      new EchoCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "alert",
      new AlertCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "joke",
      new JokeCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "open",
      new OpenCommand(this.consoleOutputStorage, this)
    );
    this.registerCommand(
      "time",
      new TimeCommand(this.consoleOutputStorage, this)
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
      this.consoleOutputStorage.addLine(
        `Sorry! Command "${command}" not known!`
      );
      return;
    }

    if (cmd.command.doShowCommand()) {
      this.consoleOutputStorage.addLine(`> ${command} ${args.join(" ")}`);
    }

    cmd.command.execute(command, args);
  }
}

//**
// * TODO:
// * - minigames ?? (with session ingame or in app or something)
// */
