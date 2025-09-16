import axios from "axios";
import { useEffect, useState } from "react";
import DBSIndex from "./DBSIndex";

const DBSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [DBSIndexs, setDBSIndexs] = useState([]);
  const searchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (DBSIndexs[0]) {
      console.log(DBSIndexs[0].card_name);
    }
  });

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
          <DBSIndex val={val} key={1} />;
        })}
      </div>
    </div>
  );
};

export default DBSearch;
