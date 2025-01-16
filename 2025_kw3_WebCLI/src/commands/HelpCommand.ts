import AbstractCommand from "./AbstractCommand";

export default class HelpCommand extends AbstractCommand {
  protected name = "help";
  protected description = "Prints the help page";
  protected usage = "help [command]";

  protected handle(args: string[]) {
    const commands = this.commandsHandler.getCommands();

    const lines: string[] = [];

    lines.push("Commands:");
    lines.push(this.consoleOutputStorage.getEmptyLine());
    commands.forEach((cmd) => {
      lines.push(`${cmd.command.getName()}:`);
      lines.push(`\u00A0\u00A0\u00A0usage: ${cmd.command.getUsage()}`);
      lines.push(
        `\u00A0\u00A0\u00A0description: ${cmd.command.getDescription()}`
      );
    });

    this.consoleOutputStorage.addLines(lines);
  }
}
