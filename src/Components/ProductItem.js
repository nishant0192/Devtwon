import React from 'react';
import styled from 'styled-components';

const ProductItem = ({ product }) => {
  const { title, description, price, image } = product;

  return (
    <ProductCard className="card">
      <ProductImage src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="card-btn">Price: ${price}</button>
        {/* Add buttons or actions for adding to cart, etc. */}
      </div>
    </ProductCard>
  );
}

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 10vw; 
  @media (max-width: 768px) {
    height: 200px;
    width:auto;
    object-fit:contain;
  }

  @media (max-width: 576px) {
    height: 150px;
    width:auto;
    object-fit:contain;
  }
`;

export default ProductItem;
