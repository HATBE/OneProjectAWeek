import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class AlertCommand extends Command {
  protected name = "alert";
  protected description = "Makes an js alert with the text";
  protected usage = "alert [message]";

  protected handle(args: string[]) {
    if (args.length <= 0) {
      return ConsoleOutputStorage.getInstance().addLine(
        `WRONG USAGE: ${this.getUsage()}`
      );
    }

    const text = args.join(" ");

    alert(text);
  }
}
