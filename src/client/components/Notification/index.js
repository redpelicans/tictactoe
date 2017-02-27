/* eslint-disable no-underscore-dangle */
import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Message = styled.div`
  width: 300px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  animation: notifIn .5s ease-out;
  opacity: ${props => (props.leaving ? 0 : 1)};
  transform: ${props => (props.leaving ? 'translateY(-100px)' : 'translateY(0)')};
  transition: all .5s;
`;

class Notification extends React.Component {
  state = {
    leaving: false,
  }

  componentDidMount() {
    const { removeNotif, id } = this.props;
    this._timeout = setTimeout(() => {
      this.setState({ leaving: true });
      this._timeout = setTimeout(() => {
        removeNotif(id);
      }, 350);
    }, 4000);
  }

  componentWillUnMount() {
    clearTimeout(this._timeout);
  }

  render() {
    const { message } = this.props;
    const { leaving } = this.state;
    return (
      <Message leaving={leaving}>{message}</Message>
    );
  }
}

Notification.propTypes = {
  removeNotif: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Notification;
