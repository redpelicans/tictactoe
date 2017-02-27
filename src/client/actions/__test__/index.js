import chai from 'chai';
import { PUT_PIECE, REPLAY } from '../../../constants/socket';
import { putPiece, replay } from '../game';

import {
  ADD_NOTIF,
  REMOVE_NOTIF,
  addNotif,
  removeNotif,
} from '../notifications';

const { describe, it } = global;
const { expect } = chai;

describe('game actions', () => {
  it('should create a put piece action', () => {
    const action = putPiece(0);
    expect(action).to.deep.equal({ type: PUT_PIECE, payload: 0 });
    const action2 = putPiece(5);
    expect(action2).to.deep.equal({ type: PUT_PIECE, payload: 5 });
  });

  it('should create a replay action', () => {
    const action = replay();
    expect(action).to.deep.equal({ type: REPLAY });
  });
});

describe('notification actions', () => {
  it('should create a add notification action', () => {
    const action = addNotif('test notification');
    expect(action).to.deep.equal({
      type: ADD_NOTIF,
      payload: 'test notification',
    });
    const action2 = addNotif('test notification 2');
    expect(action2).to.deep.equal({
      type: ADD_NOTIF,
      payload: 'test notification 2',
    });
  });

  it('should create a remove notification action', () => {
    const action = removeNotif(5);
    expect(action).to.deep.equal({
      type: REMOVE_NOTIF,
      payload: 5,
    });
    const action2 = removeNotif(0);
    expect(action2).to.deep.equal({
      type: REMOVE_NOTIF,
      payload: 0,
    });
  });
});
