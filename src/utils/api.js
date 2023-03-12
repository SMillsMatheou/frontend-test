export const fetchSuggestions = async (searchTerm) => {
  try {
    const response = await fetch(`http://localhost:3001/search?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error('There was an error fetching suggestions, please try again later');
    }
    return response.json();
  } catch (e) {
    throw new Error('There was an error fetching suggestions, please try again later');
  }
};

export const fetchProductDetail = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`);

    if (!response.ok) {
      throw new Error('There was an error fetching the product details, please try again later');
    }
    return response.json();
  } catch (e) {
    throw new Error('There was an error fetching the product details, please try again later');
  }
};
