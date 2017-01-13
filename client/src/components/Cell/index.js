/* eslint "react/no-array-index-key": "off" */
import React from 'react';
import styled from 'styled-components';
import colors from '../../colors.json';
import { Cross, Circle } from '../../components/SpeChars';


const Cell = styled.li`
  flex-basis: 33.33%;
  height: 20vh;
  line-height: 20vh;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  transition: all .2s;
  list-style: none;

  &:hover {
    background-color: ${colors.lightBlue};
    color: white;
  }
`;

const drawCells = (game, putPiece) => game.map.map((cell, key) => {
  const { playerName1, playerName2 } = game.player;
  return (
    <Cell key={key} onClick={() => putPiece(key)}>
      {(cell === playerName1 && <Cross />) || (cell === playerName2 && <Circle />)}
    </Cell>
  );
});

export default drawCells;
