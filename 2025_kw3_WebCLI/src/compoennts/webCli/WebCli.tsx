import "./webCli.css";
import ConsoleInput from "../consolelnput/ConsoleInput";
import ConsoleOutput from "../consoleOutput/ConsoleOutput";

export default function WebCli() {
  return (
    <div className="console">
      <ConsoleOutput />
      <ConsoleInput />
    </div>
  );
}
