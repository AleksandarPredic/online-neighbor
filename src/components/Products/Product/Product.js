import React from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

const product = props => {
  let images = '';
  if (props.images.length > 0) {
    images = <div className="Product__images-wrapper">
      {props.images.map(image => <img key={image.src} src={image.src} alt={image.alt} />)}
    </div>;
  }

  const productInnerHtml =
    <React.Fragment>
      <div className="Product__images">
        {images}
        {props.qty ? <span className="Product__qty">{props.qty}</span> : null}
      </div>
      {props.price ? <span className="Product__price">{props.price.toFixed(2)} DIN</span> : null}
      <h3 className="Product__name">{props.name}</h3>
    </React.Fragment>;

  return props.onClickProductCallback
    ? <div className="Product" onClick={() => props.onClickProductCallback(props.id)}>{productInnerHtml}</div>
    : <div className="Product">{productInnerHtml}</div>;
};

product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number,
  images: PropTypes.array,
  onClickProductCallback: PropTypes.func
};

export default product;
