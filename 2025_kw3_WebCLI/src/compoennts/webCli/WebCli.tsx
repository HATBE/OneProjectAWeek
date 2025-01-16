import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import { useEffect } from "react";
import CommandsHandler from "../../commands/CommandsHandler";
import ConsoleOutputStorage from "../../ConsoleOutputStorage";

export default function WebCli() {
  const consoleOutputStorage = new ConsoleOutputStorage();
  const commandsHandler = new CommandsHandler(consoleOutputStorage);

  useEffect(() => {
    consoleOutputStorage.printBanner();
  });

  return (
    <div className="console">
      <ConsoleOutput consoleOutputStorage={consoleOutputStorage} />
      <ConsoleInput
        commandsHandler={commandsHandler}
        consoleOutputStorage={consoleOutputStorage}
      />
    </div>
  );
}
