import { useState } from "react";
import mtgTypes from "./MTGTypes";

const CardType = (props) => {
  const [cardValue, setCardValue] = useState("");
  return (
    <div>
      <label htmlFor={"cardId" + props.length}>Card Type:</label>
      <select
        id={"cardId" + props.length}
        value={cardValue}
        defaultValue={props.value}
        className="CardType"
        onChange={(e) => setCardValue(e.target.value)}
      >
        {mtgTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardType;
