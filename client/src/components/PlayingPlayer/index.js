import React, { PropTypes } from 'react';
import styled from 'styled-components';
import colors from '../../colors.json';

const PPContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PPName = styled.span`
  color: ${props => (props.isPlaying ? colors.lightBlue : 'black')};
  padding: 1em;
  font-size: 20px;
  transition: all .2s;
`;

const PlayingPlayer = ({ playingPlayer, player1, player2 }) =>
  <PPContainer>
    <PPName isPlaying={playingPlayer === player1}>{player1}</PPName>
    <PPName isPlaying={playingPlayer === player2}>{player2}</PPName>
  </PPContainer>
;

PlayingPlayer.propTypes = {
  playingPlayer: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
};

export default PlayingPlayer;
