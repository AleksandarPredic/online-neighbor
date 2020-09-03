import React from 'react';
import './ProductsSearch.scss';
import PropTypes from 'prop-types';

// TODO: Add some note no product found
const productsSearch = props => {
  return (
    <div className="ProductsSearch">
      <input
        type="text"
        value={props.searchValue}
        onChange={props.searchProductsHandler}
        placeholder="Enter product name..."
      />
      <button onClick={props.buttonClickHandler}>Clear search</button>
    </div>
  );
};

productsSearch.propTypes = {
  searchValue: PropTypes.string,
  searchProductsHandler: PropTypes.func.isRequired,
  buttonClickHandler: PropTypes.func.isRequired,
};

export default productsSearch;
