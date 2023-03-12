import React, { useEffect, useState } from 'react';

import { fetchSuggestions } from '../../utils';
import { Toast } from '../Toast';

import './Autocomplete.css';

export function Autocomplete({ setProductId, setIsLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const searchTimeout = setTimeout(() => {
      setIsLoading(true);
      fetchSuggestions(searchTerm).then((_suggestions) => {
        const filteredSuggestions = _suggestions;
        filteredSuggestions.length = Math.min(filteredSuggestions.length, 10);
        setSuggestions(filteredSuggestions);
        setIsLoading(false);
      }).catch((e) => {
        setError(e.message);
        setIsLoading(false);
        setTimeout(() => setError(), 3000);
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
      {error && <Toast message={error} />}
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
