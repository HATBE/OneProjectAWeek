import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useEffect, useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import ConsoleOutputStorage from "../../ConsoleOutputStorage";
import CommandsHandler from "../../commands/CommandsHandler";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>(
    ConsoleOutputStorage.getInstance().getLines()
  );

  const handleConsoleInput = (text: string): void => {
    CommandsHandler.getInstance().handleCommand(text);
  };

  useEffect(() => {
    const storage = ConsoleOutputStorage.getInstance();

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
