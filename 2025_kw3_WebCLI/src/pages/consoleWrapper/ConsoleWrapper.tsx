import { ReactNode } from "react";
import "./consoleWrapper.css";

type ConsoleWrapperProps = {
  children: ReactNode;
};

export default function ConsoleWrapper({ children }: ConsoleWrapperProps) {
  return <div className="console-wrapper">{children}</div>;
}
