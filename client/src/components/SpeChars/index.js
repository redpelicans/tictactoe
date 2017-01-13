import React from 'react';
import styled from 'styled-components';

const SpeChar = styled.span`
  font-size: ${props => (props.higher ? '1000%' : '600%')};
`;

export const Cross = () => <SpeChar>&#10010;</SpeChar>;

export const Circle = () => <SpeChar higher>&#x025CB;</SpeChar>;
