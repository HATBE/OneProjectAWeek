import "./consoleOutput.css";

type consoleOutputProps = {
  consoleText: string[];
};

export default function ConsoleOutput({ consoleText }: consoleOutputProps) {
  return (
    <div className="console-output">
      {consoleText.length > 0 && (
        <>
          {consoleText.map((line) => {
            return <div>{line}</div>;
          })}
        </>
      )}
    </div>
  );
}
