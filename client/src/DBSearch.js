import axios from "axios";
import { useState } from "react";
import DBSIndex from "./DBSIndex";

const DBSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [DBSIndexs, setDBSIndexs] = useState([]);
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
          <DBSIndex val={val} />;
        })}
      </div>
    </div>
  );
};

export default DBSearch;
