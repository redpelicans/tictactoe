import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import R from 'ramda';
import { shallow } from 'enzyme';
import { putPiece } from '../../../actions/game';

import drawCells, { Cell, requestPut } from '../';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <Cell />', () => {
  it('should call right callback after click', () => {
    const onClick = sinon.spy();
    shallow(<Cell onClick={onClick} />).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });
});

const game = {
  board: R.times(() => null, 9),
  player: {
    playing: { username: 'playing' },
    me: { username: 'me' },
    him: { username: 'him' },
  },
};

describe('draw cells', () => {
  it('should render 9 cells', () => {
    const cells = drawCells(game, putPiece);
    expect(cells).to.have.length(9);
  });
});

describe('requestPut', () => {
  it('should call a callback if the playing player is the actual client', () => {
    const cb = sinon.spy();
    const playing = { name: 'me' };
    const me = { name: 'me' };
    const key = 0;

    requestPut(playing, me, cb, key)();
    expect(cb.calledOnce).to.equal(true);
  });
});
