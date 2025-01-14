import ConsoleOutputStorage from "../ConsoleOutputStorage";
import AlertCommand from "./AlertCommand";
import ClearCommand from "./ClearCommand";
import Command from "./Command";
import EchoCommand from "./EchoCommand";
import HelpCommand from "./HelpCommand";
import JokeCommand from "./JokeCommand";

type CommandArrayItem = {
  name: string;
  command: Command;
};

export default class CommandsHandler {
  private static instance: CommandsHandler | null = null;

  private commands: CommandArrayItem[] = [];

  public static getInstance(): CommandsHandler {
    if (!CommandsHandler.instance) {
      CommandsHandler.instance = new CommandsHandler();
      // one first call, register all commands
      CommandsHandler.getInstance().registerCommands();
    }
    return CommandsHandler.instance;
  }

  public registerCommands() {
    this.registerCommand("help", new HelpCommand());
    this.registerCommand("clear", new ClearCommand());
    this.registerCommand("echo", new EchoCommand());
    this.registerCommand("alert", new AlertCommand());
    this.registerCommand("joke", new JokeCommand());
  }

  public registerCommand(name: string, comandClass: Command): void {
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
      ConsoleOutputStorage.getInstance().addLine(
        `Sorry! Command "${command}" not known!`
      );
      return;
    }

    cmd.command.execute(command, args);
  }
}

//**
// * TODO:
// * color command
// */
