import React from 'react';

import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../../containers/Content';

const Layout = styled.div`
  padding: 0;
  margin: 0;
  display:flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F5F5F5;
`;

const App = () =>
  <Layout>
    <Header />
    <Content />
    <Footer />
  </Layout>
;

export default App;
