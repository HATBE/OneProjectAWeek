import ConsoleDataStorage from "../ConsoleDataStorage";
import Command from "./Command";

export default class EchoCommand extends Command {
  protected name = "echo";

  public handle() {
    if (this.args.length <= 0) {
      return ConsoleDataStorage.getInstance().addLine(
        "WRONG USAGE OF THIS COMMAND"
      );
    }

    const echoText = this.args.join(" ");

    ConsoleDataStorage.getInstance().addLine(echoText);
  }
}
