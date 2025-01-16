import ConsoleOutputStorage from "../ConsoleOutputStorage";
import AbstractCommand from "./AbstractCommand";

export default class OpenCommand extends AbstractCommand {
  protected name = "open";
  protected description = "Opens a url in the browser (new tab or new window)";
  protected usage = "open [url] <newTab(true|false)>";

  protected handle(args: string[]) {
    if (args.length < 1 || args.length > 2) {
      return ConsoleOutputStorage.getInstance().addLine(
        `WRONG USAGE: ${this.getUsage()}`
      );
    }

    let domain = args[0];
    const openInWindow = args[1] && args[1] === "true";

    if (
      !/(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?/g.test(domain)
    ) {
      return ConsoleOutputStorage.getInstance().addLine(
        `ERROR! URL MUST BE VALID!`
      );
    }

    if (!/^https?:\/\//i.test(domain)) {
      domain = `https://${domain}`;
    }

    if (openInWindow) {
      // open in new window
      window.open(
        domain,
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      );
    } else {
      // open in new tab
      window.open(domain);
    }
  }
}
