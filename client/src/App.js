import logo from "./logo.svg";
import "./App.css";
import DBForm from "./DBForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./Web-Img/MTGIcon.png" />
        <h1>MTG Sandbox</h1>
      </header>
      <div className="App-back">
        <DBForm />
      </div>
    </div>
  );
}

export default App;
