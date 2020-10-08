import React from 'react';
import PropTypes from 'prop-types';
import Products from '../../Products/Products';
import Message from "../Message/Message";
import './ChatOrder.scss';

const chatOrder = props => {
  if (Object.values(props.products).length < 1) {
    return null;
  }

  const allProducts = {...props.allProducts};
  const orderProducts = {...props.products};
  const products = Object.keys(orderProducts).map(productId => {
    let product = {...allProducts[productId]};
    product.qty = orderProducts[productId];
    return product;
  });

  return (
    <div className="ChatOrder">
      <Message type="human">
        {['Hi neighbor robot!!', 'What is the availability for these products?']}
      </Message>
      <Products
        products={{...products}}
        show={true}
        message="Tap on the product to remove it!"
        onClickProductCallback={props.onClickProductCallback}
      />
      {props.orderConfirmed ? null : <button onClick={props.onClickSubmitOrderCallback}>Order</button>}
    </div>
  );
};

chatOrder.propTypes = {
  products: PropTypes.object.isRequired,
  allProducts: PropTypes.object.isRequired,
  onClickProductCallback: PropTypes.func.isRequired,
  onClickSubmitOrderCallback: PropTypes.func.isRequired,
  orderConfirmed: PropTypes.bool.isRequired
};

export default chatOrder;
