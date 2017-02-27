import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import Header, { MainTitle } from '../';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <Header />', () => {
  it('should render a <MainTitle />', () => {
    const header = shallow(<Header />);
    expect(header.find(MainTitle)).to.have.length(1);
  });
});

describe('[UT] <MainTitle />', () => {
  it('should render a string', () => {
    const mainTitle = shallow(<MainTitle>TicTacToe</MainTitle>);
    expect(mainTitle.children().nodes[0]).to.equal('TicTacToe');
  });
});
