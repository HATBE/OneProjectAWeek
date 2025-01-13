import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useEffect, useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import ClearCommand from "../../commands/ClearCommand";
import EchoCommand from "../../commands/EchoCommand";
import ConsoleDataStorage from "../../ConsoleDataStorage";
import HelpCommand from "../../commands/HelpCommand";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>(
    ConsoleDataStorage.getInstance().getLines()
  );

  const handleConsoleInput = (text: string): void => {
    const cmdStrg: string[] = text.split(" ");
    const cmd: string = cmdStrg[0];
    cmdStrg.shift();
    let args: string[] = [];
    if (cmdStrg) {
      args = cmdStrg;
    }

    if (cmd === "clear") {
      new ClearCommand(args);
      return;
    } else if (cmd === "echo") {
      new EchoCommand(args);
      return;
    } else if (cmd === "help") {
      new HelpCommand(args);
      return;
    } else {
      ConsoleDataStorage.getInstance().addLine(
        `Sorry! Command "${cmd}" not known!`
      );
    }

    //setConsoleText((prev) => [...prev, text]);
  };

  useEffect(() => {
    const storage = ConsoleDataStorage.getInstance();

    const updateConsoleText = (lines: string[]) => {
      setConsoleText([...lines]);
    };

    storage.subscribe(updateConsoleText);

    return () => {
      storage.unsubscribe(updateConsoleText);
    };
  }, []);

  return (
    <div className="console">
      <ConsoleOutput consoleText={consoleText} />
      <ConsoleInput outputText={handleConsoleInput} />
    </div>
  );
}
