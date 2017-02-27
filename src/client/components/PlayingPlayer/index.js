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

const PlayingPlayer = ({ playingPlayer, me, him }) =>
  <PPContainer>
    <PPName isPlaying={playingPlayer.name === me.name}>me: {me.name}</PPName>
    <PPName isPlaying={playingPlayer.name === him.name}>him: {him.name}</PPName>
  </PPContainer>
;

PlayingPlayer.propTypes = {
  playingPlayer: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  him: PropTypes.object.isRequired,
};

export default PlayingPlayer;
