import { useEffect, useState } from "react";
import axios from "axios";

const DeckAdd = (props) => {
  const [add, setAdd] = useState(false);

  const addDeckCard = (adding) => {
    if (adding) {
      console.log(props);
      const formData = new FormData();
      formData.append("deck_id", props.deckId);
      formData.append("card_id", props.cardId);
      axios
        .post("/api/decks/cardid", formData)
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      axios
        .delete(`/api/decks/cardid/${props.cardId}/${props.deckId}`)
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    props.reload();
  };

  useEffect(() => {
    console.log("reset");
    axios
      .get(`/api/decks/cardid/${props.cardId}/${props.deckId}`)
      .then((res) => {
        if (res.data.length > 0) {
          setAdd(true);
        } else {
          setAdd(false);
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
          <button className="DeckRemBtn" onClick={() => addDeckCard(false)}>
            Remove
          </button>
        ) : (
          <button className="DeckAddBtn" onClick={() => addDeckCard(true)}>
            Add
          </button>
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

  const [decks, setDecks] = useState([]);
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

  const deckReload = () => {
    console.log("work");
    setDeckName("");
    setDecks([]);
    axios
      .get(`/api/decks`)
      .then((res) => {
        setDecks([...res.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const newDeck = () => {
    const formData = new FormData();
    formData.append("deck_name", deckName);
    axios
      .post("/api/decks", formData)
      .then((response) => {
        console.log("Success:", response.data);
        deckReload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="DBDeck">
      <ul>
        {decks.map((deck) => {
          return (
            <DeckAdd
              name={deck.deck_name}
              cardId={props.card_id}
              deckId={deck.deck_id}
              reload={deckReload}
            />
          );
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
