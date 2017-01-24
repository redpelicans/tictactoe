import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { Cell } from '../';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <Cell />', () => {
  it('should call right callback after click', () => {
    const onClick = sinon.spy();
    shallow(<Cell onClick={onClick} />).simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });
});
