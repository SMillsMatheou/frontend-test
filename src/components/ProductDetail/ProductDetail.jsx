import React, { useState, useEffect } from 'react';

import { fetchProductDetail } from '../../utils';
import { Toast } from '../Toast';

import './ProductDetail.css';

export function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((
      _productInfo,
    ) => setProductInfo(_productInfo)).catch((e) => {
      setError(e.message);
      setTimeout(() => setError(), 3000);
    });
  }, [productId]);

  if (error) {
    return <Toast message={error} />;
  }

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
