import { combineReducers } from 'redux';
import game from './game';
import notifications from './notifications';

export default combineReducers({
  game,
  notifications,
});
