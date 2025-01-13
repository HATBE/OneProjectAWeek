import "./App.css";
import ConsoleWrapper from "./pages/consoleWrapper/ConsoleWrapper";
import WebCli from "./pages/webCli/WebCli";

function App() {
  return (
    <main>
      <div className="cli-container">
        <ConsoleWrapper>
          <WebCli />
        </ConsoleWrapper>
      </div>
    </main>
  );
}

export default App;
