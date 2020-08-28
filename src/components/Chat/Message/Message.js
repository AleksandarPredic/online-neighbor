import React from 'react';
import PropTypes from 'prop-types';
import './Message.scss';
import NoImagePlaceholder from '../../../assets/images/chat/no-image.png';
import userImage from '../../../assets/images/chat/user.png';

// Robot images: https://robohash.org/

const message = props => {
  const messages = props.children.map((message, key) => <p key={key}>{message}</p>);
  const classes = ['Message', 'Message--' + props.type].join(' ');

  let imageSrc = NoImagePlaceholder;
  if (props.type === 'robot') {
    imageSrc = 'https://robohash.org/Robot.png?size=60x60';
  }

  if (props.type === 'human') {
    imageSrc = userImage;
  }

  return (
    <div className={classes}>
      <div className="Message__image">
        <img alt="Robot" src={imageSrc} />
      </div>
      <div className="Message__messages">
        {messages}
      </div>
    </div>
  );
};

message.propTypes = {
  children: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired // robot, human
};

export default message;
