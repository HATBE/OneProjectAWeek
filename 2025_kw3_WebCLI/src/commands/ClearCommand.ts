import Command from "./Command";

export default class ClearCommand extends Command {
  protected name = "clear";

  public handle() {
    this.setConsoleText([]);
  }
}
