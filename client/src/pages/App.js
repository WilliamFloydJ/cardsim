import "../CSS/App.css";
import DBForm from "../components/DBForm";
import DBSearch from "../components/DBSearch";
import MainHeader from "../components/MainHeader";

function App() {
  return (
    <div className="App">
      <MainHeader />
      <div className="App-back">
        <div className="App-title">
          <h1>CARDS</h1>
        </div>

        <DBForm />
        <DBSearch />
      </div>
    </div>
  );
}

export default App;
