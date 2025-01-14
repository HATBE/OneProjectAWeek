import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class AlertCommand extends Command {
  protected name = "alert";
  protected description = "makes an js alert with the text";
  protected usage = "alert [message]";

  public handle(args: string[]) {
    if (args.length <= 0) {
      return ConsoleOutputStorage.getInstance().addLine(
        `WRONG USAGE: ${this.getUsage()}`
      );
    }

    const text = args.join(" ");

    alert(text);
  }
}
