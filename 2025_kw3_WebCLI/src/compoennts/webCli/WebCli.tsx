import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";
import { useEffect } from "react";
import ConsoleOutputStorage from "../../ConsoleOutputStorage";

export default function WebCli() {
  useEffect(() => {
    ConsoleOutputStorage.getInstance().printBanner();
  });

  return (
    <div className="console">
      <ConsoleOutput />
      <ConsoleInput />
    </div>
  );
}
