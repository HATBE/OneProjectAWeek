import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import ClearCommand from "../../commands/ClearCommand";
import EchoCommand from "../../commands/EchoCommand";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>([]);

  const handleConsoleInput = (text: string): void => {
    if (text === "clear") {
      new ClearCommand(consoleText, setConsoleText);
      return;
    } else {
      if (text === "echo") {
        new EchoCommand(consoleText, setConsoleText);
        return;
      }
    }

    //setConsoleText((prev) => [...prev, text]);
  };

  return (
    <div className="console">
      <ConsoleOutput consoleText={consoleText} />
      <ConsoleInput outputText={handleConsoleInput} />
    </div>
  );
}
