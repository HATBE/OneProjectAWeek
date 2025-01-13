import { useEffect, useState } from "react";
import "./webCli.css";

export default function WebCli() {
  const [currentConsoleText, setCurrentConsoleText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const keysAllowed = new RegExp("^[A-Za-z0-9äöü ]$");

  const backSpaceIsPressed = (): void => {
    if (cursorPosition <= 0) {
      return;
    }

    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition - 1) +
        prevText.substring(cursorPosition)
    );
    setCursorPosition((prevPosition) => prevPosition - 1);
  };

  const deleteIsPressed = (): void => {
    if (cursorPosition > currentConsoleText.length - 1) {
      return;
    }

    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition) +
        prevText.substring(cursorPosition + 1)
    );
  };

  const moveCursorRight = (): void => {
    if (cursorPosition >= currentConsoleText.length) {
      return;
    }

    setCursorPosition((prevPosition) => prevPosition + 1);
  };

  const moveCursorLeft = (): void => {
    if (cursorPosition <= 0) {
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
    const textBeforeCursor = currentConsoleText
      .substring(0, cursorPosition)
      .replace(/ /g, "\u00A0");

    const cursor = ""; // A block character to visually represent the cursor
    const textAfterCursor = currentConsoleText
      .substring(cursorPosition)
      .replace(/ /g, "\u00A0");

    return (
      <div>
        <span className="white-text chevron">&gt;</span>
        <span>{textBeforeCursor}</span>
        <span className="cursor">{cursor}</span>
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
