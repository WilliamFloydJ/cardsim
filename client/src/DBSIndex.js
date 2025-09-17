import { useState } from "react";
import DBForm from "./DBForm";

const DBSIndex = (props) => {
  const [editing, setEditing] = useState("none");

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
          <img src="/Icons/edit.svg" onClick={() => setEditing("block")} />
          <img src="/Icons/delete.svg" />
          <img src="/Icons/deck.svg" />
        </div>
      </div>
      <div className="DBFormEdit" style={{ display: `${editing}` }}>
        <DBForm
          card_name={card_name}
          card_mana={edit.card_mana}
          card_toughness={card_toughness}
          card_power={card_power}
          card_type={card_type}
          card_id={card_id}
          card_url={card_url}
        />
      </div>
    </div>
  );
};

export default DBSIndex;
