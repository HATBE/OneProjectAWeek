import "./App.css";
import Memory from "./components/Memory";

function App() {
  return (
    <div style={{ width: "800px" }}>
      <Memory cardCount={16} />
    </div>
  );
}

export default App;
