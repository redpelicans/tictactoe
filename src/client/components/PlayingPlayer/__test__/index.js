import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import PlayingPlayer, { PPName } from '../';

const { describe, it } = global;
const { expect } = chai;

const fakeProps = {
  playingPlayer: { name: 'test1' },
  me: { name: 'test1' },
  him: { name: 'test2' },
};

describe('[UT] <PlayingPlayer />', () => {
  it('should render two <PPName />', () => {
    const playingPlayer = shallow(<PlayingPlayer {...fakeProps} />);
    expect(playingPlayer.find(PPName)).to.have.length(2);
  });
});
