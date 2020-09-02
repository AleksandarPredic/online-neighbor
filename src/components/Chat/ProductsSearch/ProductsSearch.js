import React from 'react';
import './ProductsSearch.scss';
import PropTypes from 'prop-types';

const productsSearch = props => {
  return (
    <div className="ProductsSearch">
      <input
        type="text"
        value={props.searchValue}
        onChange={props.searchProductsHandler}
      />
    </div>
  );
};

productsSearch.propTypes = {
  searchValue: PropTypes.string,
  searchProductsHandler: PropTypes.func
};

export default productsSearch;
