import React, { useEffect, useState } from 'react';

import { fetchSuggestions } from '../../utils';

import './Autocomplete.css';

export function Autocomplete({ setProductId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const searchTimeout = setTimeout(() => {
      fetchSuggestions(searchTerm).then((_suggestions) => {
        const filteredSuggestions = _suggestions;
        filteredSuggestions.length = Math.min(filteredSuggestions.length, 10);
        setSuggestions(filteredSuggestions);
      });
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const handleSelect = (id) => {
    setProductId(id);
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && suggestions.map((item) => (
        <button type="button" key={item.id} onClick={() => handleSelect(item.id)}>{item.title}</button>
      ))}
    </div>
  );
}