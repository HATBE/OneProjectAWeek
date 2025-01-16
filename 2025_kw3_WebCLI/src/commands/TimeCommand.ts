import AbstractCommand from "./AbstractCommand";

export default class TimeCommand extends AbstractCommand {
  protected name = "time";
  protected description = "Shows the current time";
  protected usage = "time";

  protected handle() {
    const nowDate = new Date();
    this.consoleOutputManager.addLine(
      `It is ${nowDate.getDate()}.${
        nowDate.getMonth() + 1
      }.${nowDate.getFullYear()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}.`
    );
  }
}
