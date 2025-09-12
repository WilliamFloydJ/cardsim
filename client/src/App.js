import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const sendForm = () => {
    const fileInput = document.getElementById("img-file");
    const file = fileInput.files[0];

    const formData = new FormData();
    // formData.append("card_name", card_name);
    // formData.append("card_type", card_type);
    // formData.append("card_img_file", file); // Use a new key for the file
    // formData.append("card_power", card_power);
    // formData.append("card_toughness", card_toughness);
    // formData.append("card_totalmana", card_totalmana);

    axios
      .post("/api/cards", formData)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="./Web-Img/MTGIcon.png" />
        <h1>MTG Sandbox</h1>
      </header>
      <div className="App-back">
        <input type="file" id="img-file" />
      </div>
    </div>
  );
}

export default App;
