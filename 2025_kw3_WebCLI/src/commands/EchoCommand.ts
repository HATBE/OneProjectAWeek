import ConsoleDataStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class EchoCommand extends Command {
  protected name = "echo";
  protected description = "Echos the entered text";
  protected usage = "echo [text]";

  public handle(args: string[]) {
    if (args.length <= 0) {
      return ConsoleDataStorage.getInstance().addLine(
        "WRONG USAGE OF THIS COMMAND"
      );
    }

    const echoText = args.join(" ");

    ConsoleDataStorage.getInstance().addLine(echoText);
  }
}
