import React, { useState, useEffect } from 'react';

import { fetchProductDetail } from '../../utils';

import './ProductDetail.css';

export function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((_productInfo) => setProductInfo(_productInfo));
  }, [productId]);

  const renderProductInfo = () => (
    <div className="detail-container">
      <div className="row">
        <img src={productInfo.image} className="product-image" alt="" />
      </div>
      <div className="row">
        <div className="product-title">{productInfo.title}</div>
      </div>
      <div className="row">
        <div className="product-description">{productInfo.description}</div>
      </div>
      <div className="row">
        <div className="product-price">{Intl.NumberFormat('en-gb', { style: 'currency', currency: 'GBP' }).format(productInfo.price)}</div>
      </div>
    </div>
  );

  return productInfo && renderProductInfo();
}
