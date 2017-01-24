import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import App from '../';
import Header from '../../Header';
import Footer from '../../Footer';
import Content from '../../../containers/Content';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <App />', () => {
  const app = shallow(<App />);
  it('should render a <Header />', () => {
    expect(app.find(Header)).to.have.length(1);
  });

  it('should render a <Footer />', () => {
    expect(app.find(Footer)).to.have.length(1);
  });

  it('should render a <Content />', () => {
    expect(app.find(Content)).to.have.length(1);
  });
});
