import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "../../utils";

import "./Autocomplete.css";

export const Autocomplete = function({setProductId}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if(!searchTerm) {
      setSuggestions([]);
      return;
    };

    const searchTimeout = setTimeout(() => {
      fetchSuggestions(searchTerm).then((_suggestions) => {
        console.log(searchTerm);
        _suggestions.length = Math.min(_suggestions.length, 10);
        setSuggestions(_suggestions)
      });
    }, 500);

    return () => clearTimeout(searchTimeout);
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
