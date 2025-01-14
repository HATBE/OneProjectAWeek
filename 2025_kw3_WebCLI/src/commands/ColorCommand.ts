import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class ColorCommand extends Command {
  protected name = "color";
  protected description = "changes the text color";
  protected usage = "color [color]";

  public handle(args: string[]) {}
}
