import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ReplayButton from '..';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <ReplayButton />', () => {
  it('should call right callback after click', () => {
    const onClick = sinon.spy();
    shallow(<ReplayButton resetMap={onClick} visible />).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

  it('should render a single child', () => {
    const replayButton = shallow(<ReplayButton resetMap={() => null} visible />);
    expect(replayButton.children().nodes).to.have.length(1);
  });
});
