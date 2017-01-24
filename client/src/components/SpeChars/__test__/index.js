import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { Cross, Circle } from '..';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <Cross />', () => {
  it('should render a single child', () => {
    const cross = shallow(<Cross />);
    expect(cross.children().nodes).to.have.length(1);
  });
});

describe('[UT] <Circle />', () => {
  it('should render a single child', () => {
    const cross = shallow(<Circle />);
    expect(cross.children().nodes).to.have.length(1);
  });
});
