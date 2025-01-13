import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import { useRef, useState } from "react";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";

export default function WebCli() {
  const [consoleText, setConsoleText] = useState<string[]>([]);

  const consoleRef = useRef<HTMLDivElement | null>(null);

  const handleConsoleInput = (text: string) => {
    setConsoleText((prev) => [...prev, text]);
  };

  return (
    <div className="console" ref={consoleRef}>
      <ConsoleOutput consoleText={consoleText} />
      <ConsoleInput
        outputText={handleConsoleInput}
        consoleHTML={consoleRef.current}
      />
    </div>
  );
}
