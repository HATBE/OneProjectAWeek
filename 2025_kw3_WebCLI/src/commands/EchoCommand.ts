import ConsoleDataStorage from "../ConsoleDataStorage";
import Command from "./Command";

export default class EchoCommand extends Command {
  protected name = "echo";

  public handle() {
    ConsoleDataStorage.getInstance().addLine("Pong");
  }
}
