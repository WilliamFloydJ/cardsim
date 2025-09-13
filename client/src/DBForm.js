import { useState } from "react";
import mtgTypes from "./MTGTypes";
import CardType from "./CardType";

const DBForm = () => {
  const [types, setTypes] = useState([{ val: "", id: 0 }]);

  const removeType = (ind) => {
    const newTypes = types.filter((val) => val.id !== ind);
    setTypes(newTypes);
  };

  const addType = () => {
    setTypes([...types, { val: "", id: types.length }]);
  };

  return (
    <div className="DBForm">
      <div>
        <label htmlFor="card-name">Card Name:</label>
        <input type="text" id="card-name" placeholder="Card Name" />
      </div>
      <div id="type-div">
        <label>Types:</label>
        {types.map((val, ind) => {
          return (
            <div>
              <CardType length={val.id} val={val.val} />
              <button onClick={() => removeType(val.id)}>-</button>
            </div>
          );
        })}
        <button onClick={addType}>+</button>
      </div>
      <div>
        <label htmlFor="img-File">Card Image:</label>
        <input type="file" id="img-file" />
      </div>
      <div className="card-power">
        <div>
          <label htmlFor="power">Power:</label>
          <input type="number" id="power" />
        </div>
        <div>
          <label htmlFor="toughness">Toughness:</label>
          <input type="number" id="toughness" />
        </div>
      </div>
    </div>
  );
};

export default DBForm;
