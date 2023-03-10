import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

function Autocomplete({setProductId}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuggestions(searchTerm).then((_suggestions) =>
      setSuggestions(_suggestions)
    );
  }, [searchTerm]);

  const handleSelect = (id) => {
    setProductId(id);
    setSearchTerm("");
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && suggestions.map((item) => {
        return (
          <button key={item.id} onClick={() => handleSelect(item.id)}>{item.title}</button>
        )
      })}
    </div>
  );
}

export default Autocomplete;
