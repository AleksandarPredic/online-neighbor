import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import './Chat.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import RobotMessage from '../../components/Chat/Message/Message';

class Chat extends Component {
  render() {
    return (
      <React.Fragment>
        <Backdrop show={true} />
        <div className="Chat">
          <header><h1>Your food bag</h1></header>
          <main>
            <RobotMessage type="robot">
              {['Hi, I\'m your robot neighbor!', 'What groceries are you looking for?']}
            </RobotMessage>
            <RobotMessage type="human">
              {['Hi neighbor robot!!', 'What is the availability for these products?']}
            </RobotMessage>
          </main>
          <footer><small>@online neighbor 2020</small></footer>
        </div>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {};

export default Chat;
