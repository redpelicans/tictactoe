import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from '../../colors.json';

const PPContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const PPName = styled.span`
  color: ${props => (props.isPlaying ? colors.lightBlue : 'black')};
  padding: 1em;
  font-size: 20px;
  transition: all .2s;
`;

const PlayingPlayer = ({ playingPlayer, player1, player2 }) =>
  <PPContainer>
    <PPName isPlaying={playingPlayer.name === player1.name}>{player1.name}</PPName>
    <PPName isPlaying={playingPlayer.name === player2.name}>{player2.name}</PPName>
  </PPContainer>
;

PlayingPlayer.propTypes = {
  playingPlayer: PropTypes.object.isRequired,
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
};

export default PlayingPlayer;
