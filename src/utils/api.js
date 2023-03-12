export const fetchSuggestions = (searchTerm) => fetch(`http://localhost:3001/search?q=${searchTerm}`).then((res) => res.json());

export const fetchProductDetail = (id) => fetch(`http://localhost:3001/products/${id}`).then((res) => res.json());
