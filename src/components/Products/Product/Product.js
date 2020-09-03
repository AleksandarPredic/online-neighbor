import React from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

const product = props => {
  let images = '';
  if (props.images.length > 0) {
    images = props.images.map(image => <img key={image.src} src={image.src} alt={image.alt} />);
  }

  const productInnerHtml =
    <React.Fragment>
      <div className="Product__images">
        <div className="Product__images-wrapper">{images}</div>
        {props.qty ? <span className="Product__qty">{props.qty}</span> : null}
      </div>
      {props.price ? <span className="Product__price">{props.price} DIN</span> : null}
      <h3 className="Product__name">{props.name}</h3>
    </React.Fragment>;

  return props.onClickProductCallback
    ? <div className="Product" onClick={() => props.onClickProductCallback(props.id)}>{productInnerHtml}</div>
    : <div className="Product">{productInnerHtml}</div>;
};

product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  qty: PropTypes.number,
  images: PropTypes.array,
  onClickProductCallback: PropTypes.func
};

export default product;
