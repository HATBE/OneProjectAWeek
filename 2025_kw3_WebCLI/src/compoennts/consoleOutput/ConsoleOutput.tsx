import { useEffect, useRef, useState } from "react";
import "./consoleOutput.css";
import ConsoleOutputStorage from "../../ConsoleOutputStorage";

export default function ConsoleOutput() {
  const [consoleText, setConsoleText] = useState<string[]>(
    ConsoleOutputStorage.getInstance().getLines()
  );

  const consoleOutputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storage = ConsoleOutputStorage.getInstance();

    const updateConsoleText = (lines: string[]) => {
      setConsoleText([...lines]);

      setTimeout(() => {
        if (consoleOutputRef.current) {
          consoleOutputRef.current.scrollTop =
            consoleOutputRef.current.scrollHeight;
        }
      }, 0);
    };

    storage.subscribe(updateConsoleText);

    return () => {
      storage.unsubscribe(updateConsoleText);
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
