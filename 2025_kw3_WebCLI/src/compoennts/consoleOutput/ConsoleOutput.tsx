import { useEffect, useRef, useState } from "react";
import "./consoleOutput.css";
import Console from "../../Console";

type ConsoleOutputProps = {
  console: Console;
};

export default function ConsoleOutput({
  console,
}: ConsoleOutputProps) {
  const [consoleText, setConsoleText] = useState<string[]>(
    console.getConsoleOutputManager().getLines()
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

    console.getConsoleOutputManager().subscribe(updateConsoleText);

    return () => {
      console.getConsoleOutputManager().unsubscribe(updateConsoleText);
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
