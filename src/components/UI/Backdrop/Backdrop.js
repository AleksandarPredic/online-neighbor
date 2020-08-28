import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const backdrop = props => (
  props.show ? <div className="Backdrop"></div> : null
);

backdrop.propTypes = {
  show: PropTypes.bool
};

export default backdrop;
