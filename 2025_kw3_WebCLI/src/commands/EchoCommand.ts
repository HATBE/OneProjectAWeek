import Command from "./Command";

export default class EchoCommand extends Command {
  protected name = "echo";

  public handle() {
    this.setConsoleText([...this.consoleText, "pong"]);
  }
}
