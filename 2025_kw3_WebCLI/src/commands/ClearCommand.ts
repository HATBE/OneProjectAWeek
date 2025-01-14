import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class ClearCommand extends Command {
  protected name = "clear";
  protected description = "Clears the console";
  protected usage = "clear";

  protected handle() {
    ConsoleOutputStorage.getInstance().clear();
  }
}
