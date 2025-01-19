import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import { useEffect } from "react";
import Console from "../../Console";

export default function WebCli() {

  const console = new Console()

  useEffect(() => {
    console.getConsoleOutputManager().printBanner();
  });

  return (
    <div className="console">
      <ConsoleOutput console={console} />
      <ConsoleInput
        console={console}
      />
    </div>
  );
}
