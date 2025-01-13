import ConsoleDataStorage from "../ConsoleDataStorage";
import Command from "./Command";

export default class ClearCommand extends Command {
  protected name = "clear";

  public handle() {
    ConsoleDataStorage.getInstance().clear();
  }
}
