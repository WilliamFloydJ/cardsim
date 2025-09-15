import { useState } from "react";
import CardType from "./CardType";
import axios from "axios";

const imgbbKey = "fa44ed50563e8880eaf7581d2b0e0c37";

const DBForm = () => {
  const [typeAmount, setTypeAmount] = useState(0);
  const [types, setTypes] = useState([{ val: "", id: typeAmount }]);
  const [cardName, setCardName] = useState("");
  const [cardImg, setCardImg] = useState(null);
  const [cardPower, setCardPower] = useState(0);
  const [cardToughness, setCardToughness] = useState(0);
  const [cardMana, setCardMana] = useState([0, 0, 0, 0, 0, 0]);

  const nameChange = (e) => {
    setCardName(e.target.value);
  };
  const imgChange = (e) => {
    setCardImg(e.target.files[0]);
  };
  const powerChange = (e) => {
    setCardPower(e.target.value);
  };
  const toughnessChange = (e) => {
    setCardToughness(e.target.value);
  };
  const manaChange = (e, ind) => {
    const newMana = [...cardMana];
    newMana[ind] = e.target.value;
    setCardMana(newMana);
  };

  const getAllTypes = () => {
    const typeElements = document.getElementsByClassName("CardType");
    const elemArr = Array.from(typeElements);
    const typeArr = [];
    elemArr.forEach((elem) => {
      typeArr.push(elem.value);
    });
    return typeArr;
  };

  const removeType = (ind) => {
    const newTypes = types.filter((val) => val.id !== ind);
    setTypes(newTypes);
  };
  const addType = () => {
    const newTypeAmount = typeAmount + 1;
    setTypeAmount(newTypeAmount);
    setTypes([...types, { val: "", id: newTypeAmount }]);
    console.log(types);
  };

  const sendForm = () => {
    const typeArr = getAllTypes();
    const formData = new FormData();
    formData.append("card_name", cardName);
    typeArr.forEach((type) => {
      formData.append("card_types", type);
    });
    formData.append("card_power", cardPower);
    formData.append("card_toughness", cardToughness);
    formData.append("card_totalmana", cardMana[0]);
    formData.append("card_red", cardMana[1]);
    formData.append("card_blue", cardMana[2]);
    formData.append("card_green", cardMana[3]);
    formData.append("card_black", cardMana[4]);
    formData.append("card_white", cardMana[5]);

    const fileFormData = new FormData();
    fileFormData.append("image", cardImg); // Use a new key for the file
    fileFormData.append("key", imgbbKey);
    axios
      .post("https://api.imgbb.com/1/upload", fileFormData)
      .then((response) => {
        console.log("Success:", response.data.data.url);
        formData.append("card_url", response.data.data.url);
        axios
          .post("/api/cards", formData)
          .then((response) => {
            console.log("Success:", response.data);
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
    <div className="DBForm">
      <div>
        <label htmlFor="card-name">Card Name:</label>
        <input
          type="text"
          value={cardName}
          onChange={nameChange}
          id="card-name"
          placeholder="Card Name"
        />
      </div>
      <div id="type-div">
        <label>Types:</label>
        {types.map((val, ind) => {
          return (
            <div key={val.id}>
              <CardType length={val.id} val={val.val} />
              <button onClick={() => removeType(val.id)}>-</button>
            </div>
          );
        })}
        <button onClick={addType}>+</button>
      </div>
      <div>
        <label htmlFor="img-File">Card Image:</label>
        <input type="file" onChange={imgChange} id="img-file" />
      </div>
      <div className="card-power">
        <div>
          <label htmlFor="power">Power:</label>
          <input
            type="number"
            value={cardPower}
            onChange={powerChange}
            id="power"
          />
        </div>
        <div>
          <label htmlFor="toughness">Toughness:</label>
          <input
            type="number"
            value={cardToughness}
            onChange={toughnessChange}
            id="toughness"
          />
        </div>
      </div>
      <label>Mana:</label>
      <div className="mana">
        <div>
          <label htmlFor="totalmana">Total Mana:</label>
          <input
            type="number"
            value={cardMana[0]}
            onChange={(e) => manaChange(e, 0)}
            id="totalmana"
          />
        </div>
        <div>
          <label htmlFor="Red">Red Mana:</label>
          <input
            type="number"
            value={cardMana[1]}
            onChange={(e) => manaChange(e, 1)}
            id="Red"
          />
        </div>
        <div>
          <label htmlFor="Blue">Blue Mana:</label>
          <input
            type="number"
            value={cardMana[2]}
            onChange={(e) => manaChange(e, 2)}
            id="Blue"
          />
        </div>
        <div>
          <label htmlFor="Green">Green Mana:</label>
          <input
            type="number"
            value={cardMana[3]}
            onChange={(e) => manaChange(e, 3)}
            id="Green"
          />
        </div>
        <div>
          <label htmlFor="Black">Black Mana:</label>
          <input
            type="number"
            value={cardMana[4]}
            onChange={(e) => manaChange(e, 4)}
            id="Black"
          />
        </div>
        <div>
          <label htmlFor="White">White Mana:</label>
          <input
            type="number"
            value={cardMana[5]}
            onChange={(e) => manaChange(e, 5)}
            id="White"
          />
        </div>
      </div>
      <button className="buttonForm" onClick={sendForm}>
        Submit
      </button>
    </div>
  );
};

export default DBForm;
