import { useEffect, useRef, useState } from "react";
import "./consoleOutput.css";
import ConsoleOutputManager from "../../ConsoleOutputManager";

type ConsoleOutputProps = {
  consoleOutputManager: ConsoleOutputManager;
};

export default function ConsoleOutput({
  consoleOutputManager,
}: ConsoleOutputProps) {
  const [consoleText, setConsoleText] = useState<string[]>(
    consoleOutputManager.getLines()
  );

  const consoleOutputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateConsoleText = (lines: string[]) => {
      setConsoleText([...lines]);

      setTimeout(() => {
        if (consoleOutputRef.current) {
          consoleOutputRef.current.scrollTop =
            consoleOutputRef.current.scrollHeight;
        }
      }, 0);
    };

    consoleOutputManager.subscribe(updateConsoleText);

    return () => {
      consoleOutputManager.unsubscribe(updateConsoleText);
    };
  }, []);

  return (
    <div className="console-output" ref={consoleOutputRef}>
      {consoleText.length > 0 && (
        <>
          {consoleText.map((line, index) => {
            return <div key={index}>{line}</div>;
          })}
        </>
      )}
    </div>
  );
}
