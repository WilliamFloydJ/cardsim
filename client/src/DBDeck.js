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

  const [decks, setDecks] = useState([
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
  ]);

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

  return (
    <div className="DBDeck">
      <ul>
        {decks.map((deck) => {
          return <DeckAdd name={deck.deck_name} cardId={props.card_id} />;
        })}
      </ul>
    </div>
  );
};

export default DBDeck;
