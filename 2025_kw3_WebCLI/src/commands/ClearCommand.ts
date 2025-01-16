import AbstractCommand from "./AbstractCommand";

export default class ClearCommand extends AbstractCommand {
  protected name = "clear";
  protected description = "Clears the console";
  protected usage = "clear";

  protected showCommand: boolean = false;

  protected handle() {
    this.consoleOutputStorage.clear();
  }
}
