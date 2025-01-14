import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class ClearCommand extends Command {
  protected name = "clear";
  protected description = "clears the console";
  protected usage = "clear";

  public handle() {
    ConsoleOutputStorage.getInstance().clear();
  }
}
