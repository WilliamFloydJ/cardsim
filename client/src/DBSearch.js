import axios from "axios";
import { useEffect, useState } from "react";
import DBSIndex from "./DBSIndex";

const DBSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [DBSIndexs, setDBSIndexs] = useState([
    {
      card_black: 0,
      card_blue: 0,
      card_green: 1,
      card_id: 12,
      card_name: "Spider-Girl , Legacy Hero",
      card_power: 2,
      card_red: 0,
      card_totalmana: 2,
      card_toughness: 2,
      card_type: ["Legendary", "Creature", "Spider", "Human"],
      card_url: "https://i.ibb.co/27Mbzqsc/150.jpg",
      card_white: 1,
    },
  ]);
  const searchChange = (e) => {
    setSearchText(e.target.value);
  };

  const search = () => {
    axios
      .get(`/api/cards/${searchText}`)
      .then((response) => {
        console.log("Success:", response.data);
        setDBSIndexs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="DBSearch">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        value={searchText}
        onChange={searchChange}
        id="search"
      />
      <button className="buttonForm" onClick={search}>
        Submit
      </button>
      <div>
        {DBSIndexs.map((val) => {
          return <DBSIndex val={val} key={1} />;
        })}
      </div>
    </div>
  );
};

export default DBSearch;
