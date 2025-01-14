import ConsoleOutputStorage from "../ConsoleOutputStorage";
import AbstractCommand from "./AbstractCommand";

export default class AlertCommand extends AbstractCommand {
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
