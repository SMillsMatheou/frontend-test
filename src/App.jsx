import React, { useState } from 'react';

import './App.css';

import { Autocomplete, LoaderIcon, ProductDetail } from './components';

function App() {
  const [productId, setProductId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <Autocomplete setProductId={setProductId} setIsLoading={setIsLoading} />
      <ProductDetail productId={productId} setIsLoading={setIsLoading} />
      {isLoading && <LoaderIcon />}
    </div>
  );
}

export default App;
