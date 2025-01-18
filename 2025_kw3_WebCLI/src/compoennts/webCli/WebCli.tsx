import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import { useEffect } from "react";
import CommandsHandler from "../../commands/CommandsHandler";
import ConsoleOutputManager from "../../ConsoleOutputManager";
import Console from "../../Console";

export default function WebCli() {
  const consoleOutputManager = new ConsoleOutputManager();
  const commandsHandler = new CommandsHandler(consoleOutputManager);
  const console = new Console(consoleOutputManager, commandsHandler)

  useEffect(() => {
    consoleOutputManager.printBanner();
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
