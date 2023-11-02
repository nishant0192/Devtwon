import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import styled from 'styled-components';

const ProductList = ({ sortType, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Update to display 3 products per page

  const fetchProducts = async () => {
    let url = 'https://fakestoreapi.com/products';

    if (selectedCategory !== 'all') {
      url = `https://fakestoreapi.com/products/category/${selectedCategory.toLowerCase()}`;
    }

    if (selectedCategory === 'All') {
      url = 'https://fakestoreapi.com/products';
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === 'asc') {
      return a.price - b.price;
    } else if (sortType === 'desc') {
      return b.price - a.price;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <ProductCard className="card">
      <ProductContainer className="row">
        {displayedProducts.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <ProductItem product={product} />
          </div>
        ))}
      </ProductContainer>
      <Pagination>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </Pagination>
    </ProductCard>
  );
};

const ProductContainer = styled.div`
  /* Your styling for product container */
`;

const ProductCard = styled.div`
  width: 100%; /* Adjust this width as needed */
  /* Other styles */
`;

const Pagination = styled.div`
  /* Your styling for pagination */
  /* If you are using Bootstrap classes, you can style them here */
`;

export default ProductList;
