import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import { useEffect } from "react";
import CommandsHandler from "../../commands/CommandsHandler";
import ConsoleOutputManager from "../../ConsoleOutputManager";

export default function WebCli() {
  const consoleOutputManager = new ConsoleOutputManager();
  const commandsHandler = new CommandsHandler(consoleOutputManager);

  useEffect(() => {
    consoleOutputManager.printBanner();
  });

  return (
    <div className="console">
      <ConsoleOutput consoleOutputManager={consoleOutputManager} />
      <ConsoleInput
        commandsHandler={commandsHandler}
        consoleOutputManager={consoleOutputManager}
      />
    </div>
  );
}
