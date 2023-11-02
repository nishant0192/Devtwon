//App.js 

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import FilterAndSort from './Components/FilterAndSort';
import styled from 'styled-components';

const App = () => {
  const [sortType, setSortType] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FilterAndSort
                  setSortType={setSortType}
                  setSelectedCategory={setSelectedCategory}
                />
                <ProductList
                  sortType={sortType}
                  selectedCategory={selectedCategory}
                />
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  /* Your styling for the main container */
`;

export default App;