import ConsoleDataStorage from "../ConsoleOutputStorage";
import Command from "./Command";
import CommandsHandler from "./CommandsHandler";

export default class HelpCommand extends Command {
  protected name = "help";
  protected description = "Prints the help page";
  protected usage = "help [command]";

  public handle(args: string[]) {
    const commands = CommandsHandler.getInstance().getCommands();

    ConsoleDataStorage.getInstance().addLine("HELP");
    ConsoleDataStorage.getInstance().addSeperator();
    ConsoleDataStorage.getInstance().addEmptyLine();

    commands.forEach((cmd) => {
      ConsoleDataStorage.getInstance().addLine(`${cmd.command.getName()}:`);
      ConsoleDataStorage.getInstance().addLine(
        `\u00A0\u00A0\u00A0usage: ${cmd.command.getUsage()}`
      );
      ConsoleDataStorage.getInstance().addLine(
        `\u00A0\u00A0\u00A0description: ${cmd.command.getDescription()}`
      );
    });
  }
}
