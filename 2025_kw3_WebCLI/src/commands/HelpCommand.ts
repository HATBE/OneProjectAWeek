import ConsoleOutputStorage from "../ConsoleOutputStorage";
import AbstractCommand from "./AbstractCommand";
import CommandsHandler from "./CommandsHandler";

export default class HelpCommand extends AbstractCommand {
  protected name = "help";
  protected description = "Prints the help page";
  protected usage = "help [command]";

  protected handle(args: string[]) {
    const commands = CommandsHandler.getInstance().getCommands();

    const lines: string[] = [];

    lines.push("HELP");

    lines.push(ConsoleOutputStorage.getInstance().getSeperator());
    lines.push(ConsoleOutputStorage.getInstance().getEmptyLine());

    commands.forEach((cmd) => {
      lines.push(`${cmd.command.getName()}:`);
      lines.push(`\u00A0\u00A0\u00A0usage: ${cmd.command.getUsage()}`);
      lines.push(
        `\u00A0\u00A0\u00A0description: ${cmd.command.getDescription()}`
      );
    });

    ConsoleOutputStorage.getInstance().addLines(lines);
  }
}
