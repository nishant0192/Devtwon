import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import stt from "../stt.png";

const ProductList = ({ sortType, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    let url = "https://fakestoreapi.com/products";

    if (selectedCategory !== "all") {
      url = `https://fakestoreapi.com/products/category/${selectedCategory.toLowerCase()}`;
    }

    if (selectedCategory === "All") {
      url = "https://fakestoreapi.com/products";
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);

      // Simulate loading for a minimum of 2 seconds
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "asc") {
      return a.price - b.price;
    } else if (sortType === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <ProductCard className="card">
      <ProductContainer className="row">
        {loading
          ? [1, 2, 3].map((_, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={300}
                  viewBox="0 0 400 300"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
                  <rect x="0" y="210" rx="3" ry="3" width="70%" height="10" />
                  <rect x="0" y="230" rx="3" ry="3" width="60%" height="10" />
                  <rect x="0" y="250" rx="3" ry="3" width="50%" height="10" />
                </ContentLoader>
              </div>
            ))
          : displayedProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                <ProductItem product={product} />
              </div>
            ))}
      </ProductContainer>
      <Pagination>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(sortedProducts.length / productsPerPage) },
            (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
        {showScrollButton && (
          <ScrollToTopButton className="stt"
            onClick={scrollToTop}
            style={{
              background: "white",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={stt} alt="" style={{marginRight:"5rem", marginBottom:"1rem"}}/>
          </ScrollToTopButton>
        )}
      </Pagination>
    </ProductCard>
  );
};

const ProductContainer = styled.div``;

const ProductCard = styled.div`
  width: 100%;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Pagination = styled.div``;

export default ProductList;
