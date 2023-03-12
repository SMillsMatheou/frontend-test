import React, { useState, useEffect } from 'react';

import { fetchProductDetail } from '../../utils';
import { Toast } from '../Toast';

import './ProductDetail.css';

export function ProductDetail({ productId, setIsLoading }) {
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    // added articially longer loading time to demonstrate spinner
    setTimeout(() => {
      try {
        fetchProductDetail(productId).then((
          _productInfo,
        ) => {
          setIsLoading(false);
          setProductInfo(_productInfo);
        }).catch((e) => {
          setError(e.message);
          setIsLoading(false);
          setTimeout(() => setError(), 3000);
        });
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
        setTimeout(() => setError(), 3000);
      }
    }, 1000);
  }, [productId]);

  if (error) {
    return <Toast message={error} />;
  }

  const renderProductInfo = () => (
    <div data-testid="productdetail__container" className="detail-container">
      <div className="row">
        <img data-testid="productdetail__img" src={productInfo.image} className="product-image" alt="" />
      </div>
      <div className="row">
        <div data-testid="productdetail__title" className="product-title">{productInfo.title}</div>
      </div>
      <div className="row">
        <div data-testid="productdetail__description" className="product-description">{productInfo.description}</div>
      </div>
      <div className="row">
        <div data-testid="productdetail__price" className="product-price">{Intl.NumberFormat('en-gb', { style: 'currency', currency: 'GBP' }).format(productInfo.price)}</div>
      </div>
    </div>
  );

  return productInfo && renderProductInfo();
}
