import AbstractCommand from "./AbstractCommand";

export default class EchoCommand extends AbstractCommand {
  protected name = "echo";
  protected description = "Echos the entered text";
  protected usage = "echo [text]";

  protected showCommand: boolean = false;

  protected handle(args: string[]) {
    if (args.length <= 0) {
      return this.consoleOutputManager.addLine(
        `WRONG USAGE: ${this.getUsage()}`
      );
    }

    const echoText = args.join(" ");

    this.consoleOutputManager.addLine(echoText);
  }
}
