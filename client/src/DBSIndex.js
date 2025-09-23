import { useState } from "react";
import DBForm from "./DBForm";
import DBDeck from "./DBDeck";

const DBSIndex = (props) => {
  const [editing, setEditing] = useState(false);
  const [decking, setDecking] = useState(true);

  const {
    card_black,
    card_white,
    card_blue,
    card_green,
    card_name,
    card_red,
    card_totalmana,
    card_url,
    card_toughness,
    card_power,
    card_type,
    card_id,
  } = props.val;
  const edit = {
    ...props.val,
    card_mana: [
      card_totalmana,
      card_red,
      card_blue,
      card_green,
      card_black,
      card_white,
    ],
  };

  return (
    <div className="DBSIndex">
      <div>
        <h1>{card_name}</h1>
        <img src={card_url} />
        <div className="IndexIcons">
          <img src="/Icons/edit.svg" onClick={() => setEditing(!editing)} />
          <img src="/Icons/delete.svg" />
          <img src="/Icons/deck.svg" onClick={() => setDecking(!decking)} />
        </div>
      </div>
      <div
        className="DBFormEdit"
        style={{ display: `${editing ? "block" : "none"}` }}
      >
        <DBForm
          card_name={card_name}
          card_mana={edit.card_mana}
          card_toughness={card_toughness}
          card_power={card_power}
          card_type={card_type}
          card_id={card_id}
          card_url={card_url}
          setEditing={setEditing}
        />
      </div>
      <div
        className="DBDeckEdit"
        style={{ display: `${decking ? "block" : "none"}` }}
      >
        <DBDeck card_id={card_id} />
      </div>
    </div>
  );
};

export default DBSIndex;
