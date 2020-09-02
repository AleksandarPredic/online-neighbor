import React from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

const product = props => {
  let images = '';
  if (props.images.length > 0) {
    images = props.images.map(image => <img key={image.src} src={image.src} alt={image.alt} />);
  }

  return (
    <div className="Product">
      <div className="Product__images">
        {images}
      </div>
      <h3>{props.name}</h3>
      <span>{props.price} DIN</span>
    </div>
  );
};

product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  images: PropTypes.array
};

export default product;
