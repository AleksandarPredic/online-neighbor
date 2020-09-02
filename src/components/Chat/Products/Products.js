import React from 'react';
import PropTypes from 'prop-types';
import './Products.scss';
import Product from './Product/Product';

const products = props => {
  const products = props.products.map(product => {
    return (
      <Product
        key={product.id}
        name={product.name}
        price={product.price}
        images={product.images}
      />
    )
  })

  const classes = [
    'Products',
    props.products.length > 0 ? 'Products--show' : 'Products--hide'
  ];

  return (
    <div className={classes.join(' ')}>
      {products}
    </div>
  );
};

products.propTypes = {
  products: PropTypes.array.isRequired
};

export default products;
