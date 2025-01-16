import { useEffect, useRef, useState } from "react";
import "./consoleOutput.css";
import ConsoleOutputStorage from "../../ConsoleOutputStorage";

type ConsoleOutputProps = {
  consoleOutputStorage: ConsoleOutputStorage;
};

export default function ConsoleOutput({
  consoleOutputStorage,
}: ConsoleOutputProps) {
  const [consoleText, setConsoleText] = useState<string[]>(
    consoleOutputStorage.getLines()
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

    consoleOutputStorage.subscribe(updateConsoleText);

    return () => {
      consoleOutputStorage.unsubscribe(updateConsoleText);
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
