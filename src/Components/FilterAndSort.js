import React from 'react';
import styled from 'styled-components';

const FilterAndSort = ({ setFilteredProducts, setSortType, setSelectedCategory }) => {
  const categories = ["All", "Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"];

  const handleCategoryFilter = category => {
    setSelectedCategory(category);
  };

  const handlePriceSort = type => {
    setSortType(type);
  };

  return (
    <FilterSortContainer>
      <div className='categories'>
        <h3>Categories</h3>
        <CategoryContainer>
          {categories.map((category, index) => (
            <CategoryButton key={index} onClick={() => handleCategoryFilter(category)}>
              {category}
            </CategoryButton>
          )) }
        </CategoryContainer>
      </div>
      <div className='sort'>
        <h3>Sort by Price :</h3>
        <button onClick={() => handlePriceSort('asc')}>Price Low to High</button>
        <button onClick={() => handlePriceSort('desc')}>Price High to Low</button>
      </div>
    </FilterSortContainer>
  );
}

const FilterSortContainer = styled.div`

`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CategoryButton = styled.button`

  background-color: #f0f0f0;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

export default FilterAndSort;
