import axios from "axios";

const DBSearch = () => {
  const search = () => {};

  return (
    <div className="DBSearch">
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" />
      <button className="buttonForm">Submit</button>
    </div>
  );
};

export default DBSearch;
