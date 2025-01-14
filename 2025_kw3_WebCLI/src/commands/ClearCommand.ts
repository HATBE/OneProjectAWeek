import ConsoleDataStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class ClearCommand extends Command {
  protected name = "clear";
  protected description = "clears the console";
  protected usage = "clear";

  public handle() {
    ConsoleDataStorage.getInstance().clear();
  }
}
