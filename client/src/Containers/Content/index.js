import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allTheActions from '../../actions/game';
import drawCells from '../../components/Cell';
import ReplayButton from '../../components/ReplayButton';
import PlayingPlayer from '../../components/PlayingPlayer';

const ContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.ul`
  height: 60vh;
  width: 60vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: 0;
  margin: 0;
  border: 1px solid black;
`;

const Top = styled.span`
  position: absolute;
  background-color: black;
  left: 0%;
  top: 33.333%;
  width: 100%;
  height: 1px;
`;

const Bottom = styled.span`
  position: absolute;
  background-color: black;
  left: 0%;
  top: 66.666%;
  width: 100%;
  height: 1px;
`;

const Left = styled.span`
  position: absolute;
  background-color: black;
  top: 0%;
  left: 33.333%;
  height: 100%;
  width: 1px;
`;

const Right = styled.span`
  position: absolute;
  background-color: black;
  top: 0%;
  left: 66.666%;
  height: 100%;
  width: 1px;
`;

const WinnerDisplay = styled.div`
  height: 40px;
  margin: 30px 0 50px 0;
  padding: 0;
  display: flex;
`;

const WinnerMessage = styled.span`
  font-size: 50px;
  text-transform: uppercase;
`;
const Content = ({ game, actions }) =>
  <ContentContainer>
    <WinnerDisplay>
      <WinnerMessage>{(game.win && `${game.win} WINS`) || (game.full && 'DRAW')}</WinnerMessage>
      <ReplayButton visible={!!(game.win || game.full)} resetMap={actions.resetMap} />
    </WinnerDisplay>
    <PlayingPlayer
      playingPlayer={game.player.playing}
      player1={game.player.playerName1}
      player2={game.player.playerName2}
    />
    <MapContainer>
      <Top />
      <Left />
      <Right />
      <Bottom />
      {drawCells(game, actions.putPiece)}
    </MapContainer>
  </ContentContainer>
;

Content.propTypes = {
  game: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ game }) => ({ game });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allTheActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
