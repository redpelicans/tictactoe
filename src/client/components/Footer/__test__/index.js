import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import Footer from '../';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <Footer />', () => {
  it('should render a string', () => {
    const footer = shallow(<Footer />);
    expect(footer.children().nodes[0]).to.equal('rle-mino - REDPELICANS');
  });
});
