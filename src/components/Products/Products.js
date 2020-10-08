import React from 'react';
import PropTypes from 'prop-types';
import './Products.scss';
import Product from './Product/Product';

const products = props => {
  const products = Object.values(props.products).map(product => {
    return (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        images={product.images}
        qty={product.qty}
        onClickProductCallback={props.onClickProductCallback}
      />
    )
  });

  const classes = [
    'Products',
    props.show ? 'Products--show' : 'Products--hide'
  ];

  return (
    <div className={classes.join(' ')}>
      <div className="Products__wrapper">
        {products}
      </div>
      {props.message ? <small className="Products__message">{props.message}</small> : null}
    </div>
  );
};

products.propTypes = {
  products: PropTypes.object.isRequired,
  show: PropTypes.bool,
  onClickProductCallback: PropTypes.func,
  message: PropTypes.string
};

export default products;
