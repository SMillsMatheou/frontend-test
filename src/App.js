import React, { useState } from "react";

import "./App.css";

import { Autocomplete, ProductDetail } from "./components";

function App() {
  const [productId, setProductId] = useState();

  return (
    <div className="App">
      <Autocomplete setProductId={setProductId}/>
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
