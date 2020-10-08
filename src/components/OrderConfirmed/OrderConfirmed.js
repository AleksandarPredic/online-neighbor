import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Products from '../Products/Products';
import Message from '../Chat/Message/Message';
import './OrderConfirmed.scss';

const OrderConfirmed = props => {
  const scrollTo = useRef(null);

  useEffect(() => {
    scrollTo.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }, [])

  const allProducts = {...props.allProducts};
  const orderProducts = {...props.products};
  let totalPrice = 0;
  const products = Object.keys(orderProducts).map(productId => {
    let product = {...allProducts[productId]};

    totalPrice += product.price;

    product.qty = orderProducts[productId];
    product.name = '';
    product.price = null;

    return product;
  });

  const style = {
    opacity: 0,
    pointerEvents: 'none',
    height: '1px'
  };

  // TODO: Optimize not to render until the state is right
  return (
    <div className="OrderConfirmed" ref={scrollTo}>
      <Message type="robot">
        {[
          'Hi again, I\'ve verified the list and I have all the product in stock:',
        ]}
      </Message>
      <Products
        products={{...products}}
        show={true}
        message={`Order total price is: ${totalPrice} DIN`}
      />
      <Message type="robot">
        {[
          'Your order will be packed and ready for pickup in 3 hours!',
          'You will pay in the store.',
          'See you later neighbor!'
        ]}
      </Message>
    </div>
  );
};

OrderConfirmed.propTypes = {
  products: PropTypes.object.isRequired
};

export default OrderConfirmed;
