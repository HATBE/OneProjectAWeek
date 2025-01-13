import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>([]);

  const handleConsoleInput = (text: string) => {
    setConsoleText((prev) => [...prev, text]);
  };

  return (
    <div className="console">
      <ConsoleOutput consoleText={consoleText} />
      <ConsoleInput outputText={handleConsoleInput} />
    </div>
  );
}
