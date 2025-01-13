import "./App.css";
import ConsoleWrapper from "./compoennts/consoleWrapper/ConsoleWrapper";
import WebCli from "./compoennts/webCli/WebCli";

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
