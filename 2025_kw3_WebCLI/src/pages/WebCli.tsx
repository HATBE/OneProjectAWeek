import { useEffect, useState } from "react";
import "./webCli.css";

export default function WebCli() {
  const [currentConsoleText, setCurrentConsoleText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const keysAllowed = new RegExp("^[A-Za-z0-9äöü ]$");

  const backSpaceIsPressed = (): void => {
    if (cursorPosition < 0) {
      return;
    }

    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition) +
        prevText.substring(cursorPosition + 1)
    );
    setCursorPosition((prevPosition) => prevPosition - 1);
  };

  const deleteIsPressed = (): void => {
    console.log("before", currentConsoleText.length, `"${currentConsoleText}"`);
    if (cursorPosition > currentConsoleText.length - 1) {
      return;
    }

    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition + 1) +
        prevText.substring(cursorPosition + 2)
    );
    console.log("after", currentConsoleText.length, `"${currentConsoleText}"`);
  };

  const moveCursorRight = (): void => {
    if (cursorPosition >= currentConsoleText.length) {
      return;
    }

    setCursorPosition((prevPosition) => prevPosition + 1);
  };

  const moveCursorLeft = (): void => {
    if (cursorPosition < 0) {
      return;
    }

    setCursorPosition((prevPosition) => prevPosition - 1);
  };

  const appendNewCharToConsole = (keyPressed: string) => {
    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition + 1) +
        keyPressed +
        prevText.substring(cursorPosition + 1)
    );
    setCursorPosition((prevPosition) => prevPosition + 1);
  };

  const enterIsPressed = (): void => {
    setCurrentConsoleText("");
    setCursorPosition(0);
  };

  const renderConsoleInput = (): JSX.Element => {
    const textBeforeCursor = currentConsoleText.substring(0, cursorPosition);
    const textAtCursor = currentConsoleText.charAt(cursorPosition);
    const textAfterCursor = currentConsoleText.substring(cursorPosition + 1);

    console.log(`"${textAtCursor}"`);

    return (
      <div>
        <span className="white-text">&gt;</span> {textBeforeCursor}
        <span className="cursor">{textAtCursor}</span>
        <span>{textAfterCursor}</span>
      </div>
    );
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    event.preventDefault();

    const keyPressed = event.key;

    if (!keyPressed) {
      return;
    }

    switch (keyPressed) {
      case "Backspace":
        return backSpaceIsPressed();
      case "Delete":
        return deleteIsPressed();
      case "Enter":
        return enterIsPressed();
      case "ArrowLeft":
        return moveCursorLeft();
      case "ArrowRight":
        return moveCursorRight();
    }

    if (keysAllowed.test(keyPressed)) {
      appendNewCharToConsole(keyPressed);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cursorPosition, currentConsoleText]);

  return (
    <div className="console">
      <div className="console-output"></div>
      <div className="console-input">{renderConsoleInput()}</div>
    </div>
  );
}

/** TODO:
 - fix cursor
 - fix text addition
 - fix space before text (cursor)
 - fix space after text (cursor)
*/
