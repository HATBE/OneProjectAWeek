import { useEffect, useState } from "react";
import "./ConsoleInput.css";

type ConsoleInputProps = {
  outputText: (text: string) => void;
};

export default function ConsoleInput({ outputText }: ConsoleInputProps) {
  const [currentConsoleText, setCurrentConsoleText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const keysAllowed = new RegExp("^[A-Za-z0-9äöü ]$");

  const ctrlVIsPressed = async (): Promise<void> => {
    const clipboardText = await navigator.clipboard.readText();
    addTextToCursorPosition(clipboardText);
  };

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

  const addTextToCursorPosition = (
    text: string,
    cursorStay: boolean = false
  ) => {
    setCurrentConsoleText(
      (prevText) =>
        prevText.substring(0, cursorPosition) +
        text +
        prevText.substring(cursorPosition)
    );

    if (!cursorStay) {
      setCursorPosition((prevPosition) => prevPosition + text.length);
    }
  };

  const enterIsPressed = (): void => {
    const text = currentConsoleText.trim();

    if (!text) {
      return;
    }
    outputText(text);
    setCurrentConsoleText("");
    setCursorPosition(0);
  };

  const renderConsoleInput = (): JSX.Element => {
    const textBeforeCursor = currentConsoleText
      .substring(0, cursorPosition)
      .replace(/ /g, "\u00A0");

    const textAfterCursor = currentConsoleText
      .substring(cursorPosition)
      .replace(/ /g, "\u00A0");

    return (
      <div>
        <span className="white-text chevron">&gt;</span>
        <span>{textBeforeCursor}</span>
        <span className="cursor"></span>
        <span>{textAfterCursor}</span>
      </div>
    );
  };

  const handleKeyDownEvent = (event: KeyboardEvent): void => {
    event.preventDefault();

    const keyPressed = event.key;

    if (!keyPressed) {
      return;
    }

    if (event.ctrlKey && event.key === "v") {
      ctrlVIsPressed();
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
      addTextToCursorPosition(keyPressed);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [cursorPosition, currentConsoleText]);

  return <div className="console-input">{renderConsoleInput()}</div>;
}
