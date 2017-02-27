/* eslint-disable no-return-assign */
import { REMOVE_NOTIF } from '../actions/notifications';
import {
  JOINED,
  LEFT,
  START,
  OTHER_READY,
} from '../../constants/socket';

let id = 0;

export default (state = [], action) => {
  switch (action.type) {
    case JOINED:
      return [...state, { text: 'game joined', id: id += 1 }];
    case LEFT:
      return [...state, { text: 'The other player left', id: id += 1 }];
    case START:
      return [...state, { text: 'The game is now ready', id: id += 1 }];
    case OTHER_READY:
      return [...state, { text: 'The other player is ready', id: id += 1 }];
    case REMOVE_NOTIF:
      return state.filter(el => el.id !== action.payload);
    default:
      return state;
  }
};
