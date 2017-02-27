import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import allTheActions from '../../actions';

import Notification from '../../components/Notification';

const NotificationsContainer = styled.ul`
  padding: 0;
  list-style: none;
  position: absolute;
  right: 1%;
  top: 0;
`;

const Notifications = ({ notifications, actions }) =>
  <NotificationsContainer>
    {notifications.map(el =>
      <Notification key={el.id} message={el.text} id={el.id} removeNotif={actions.removeNotif} />
    )}
  </NotificationsContainer>
;

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ notifications }) => ({ notifications });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allTheActions.notifications, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
