import { useEffect, useState } from "react";
import axios from "axios";

const DeckAdd = (props) => {
  const [add, setAdd] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/decks/cardid/${props.cardId}`)
      .then((res) => {
        if (res.data.length > 0) {
          setAdd(true);
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <li className="DeckAdd">
      <h1>{props.name}</h1>
      <div className="DeckBtn">
        {add ? (
          <h1 className="DeckAddBtn">Add</h1>
        ) : (
          <h1 className="DeckRemBtn">Remove</h1>
        )}
      </div>
    </li>
  );
};

const DBDeck = (props) => {
  const test = {
    black: null,
    blue: null,
    deck_name: "test",
    green: null,
    id: 1,
    red: null,
    white: null,
  };

  const [decks, setDecks] = useState([test]);
  const [deckName, setDeckName] = useState("");

  const changeName = (e) => {
    setDeckName(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/api/decks`)
      .then((res) => {
        setDecks([...decks, ...res.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const newDeck = () => {
    const formData = new FormData();
    formData.append("deck_name", deckName);
    axios
      .post("/api/decks", formData)
      .then((response) => {
        console.log("Success:", response.data);
        setDeckName("");
        axios
          .get(`/api/decks`)
          .then((res) => {
            setDecks([...res.data]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="DBDeck">
      <ul>
        {decks.map((deck) => {
          return <DeckAdd name={deck.deck_name} cardId={props.card_id} />;
        })}
        <li className="DeckAdd">
          <h1>Add New</h1>
          <div className="DeckBtn">
            <input type="text" value={deckName} onChange={changeName} />
            <button onClick={newDeck}>Submit</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DBDeck;
