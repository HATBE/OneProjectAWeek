import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class EchoCommand extends Command {
  protected name = "echo";
  protected description = "Echos the entered text";
  protected usage = "echo [text]";

  protected handle(args: string[]) {
    if (args.length <= 0) {
      return ConsoleOutputStorage.getInstance().addLine(
        `WRONG USAGE: ${this.getUsage()}`
      );
    }

    const echoText = args.join(" ");

    ConsoleOutputStorage.getInstance().addLine(echoText);
  }
}
