import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

export const MainTitle = styled.h1`
  font-size: 40px;
`;

const Header = () =>
  <HeaderContainer>
    <MainTitle>TicTacToe</MainTitle>
  </HeaderContainer>
;

export default Header;
