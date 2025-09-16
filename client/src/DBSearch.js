import axios from "axios";
import { useState } from "react";

const DBSearch = () => {
  const [searchText, setSearchText] = useState("");
  const searchChange = (e) => {
    setSearchText(e.target.value);
  };

  const search = () => {
    axios
      .get(`/api/cards/${searchText}`)
      .then((response) => {
        console.log("Success:", response.data);
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
    </div>
  );
};

export default DBSearch;
