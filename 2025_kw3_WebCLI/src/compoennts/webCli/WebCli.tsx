import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useEffect, useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import ClearCommand from "../../commands/ClearCommand";
import EchoCommand from "../../commands/EchoCommand";
import ConsoleDataStorage from "../../ConsoleDataStorage";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>(
    ConsoleDataStorage.getInstance().getLines()
  );

  const handleConsoleInput = (text: string): void => {
    if (text === "clear") {
      new ClearCommand();
      return;
    } else {
      if (text === "echo") {
        new EchoCommand();
        return;
      }
    }

    //setConsoleText((prev) => [...prev, text]);
  };

  useEffect(() => {
    const storage = ConsoleDataStorage.getInstance();

    const updateData = (lines: string[]) => {
      setConsoleText([...lines]);
    };

    storage.subscribe(updateData);

    return () => {
      storage.unsubscribe(updateData);
    };
  }, []);

  return (
    <div className="console">
      <ConsoleOutput consoleText={consoleText} />
      <ConsoleInput outputText={handleConsoleInput} />
    </div>
  );
}
