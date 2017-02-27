/* eslint "react/no-array-index-key": "off" */
import React from 'react';
import styled from 'styled-components';
import R from 'ramda';
import colors from '../../colors.json';
import { Cross, Circle } from '../../components/SpeChars';

export const Cell = styled.li`
  flex-basis: 33.33%;
  height: 33.33%;
  line-height: 20vh;
  vertical-align: middle;
  cursor: ${props => (props.playing ? 'pointer' : 'default')};
  text-align: center;
  transition: all .2s;
  list-style: none;

  &:hover {
    background-color: ${props => (props.playing ? colors.lightBlue : 'transparent')};
    color: ${props => (props.playing ? 'white' : 'black')};
  }
`;

export const requestPut = (playing, me, putPiece, key) => () => {
  if (playing.name === me.name) putPiece(key);
};

const drawCells = ({ board, player: { me, him, playing } }, putPiece) => board.map((cell, key) =>
  <Cell
    key={key}
    onClick={requestPut(playing, me, putPiece, key)}
    playing={playing.name === me.name}
  >
    {(R.equals((cell || {}).name, me.name) && <Cross />)
    ||
    (R.equals((cell || {}).name, him.name) && <Circle />)}
  </Cell>
);

export default drawCells;
