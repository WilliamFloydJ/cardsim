import { useEffect } from "react";
import axios from "axios";

const DeckAdd = (props) => {
  return (
    <div className="DeckAdd">
      <h1>{props.name}</h1>
    </div>
  );
};

const DBDeck = () => {
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/decks`)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <div className="DBDeck"></div>;
};

export default DBDeck;
