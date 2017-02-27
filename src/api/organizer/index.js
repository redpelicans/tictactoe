import R from 'ramda';
import Game from '../game';
import { logerror/* , loginfo*/ } from '../util';
import Player from '../player';
import {
  IS_FULL,
  NO_GAME,
  ALREADYTAKEN,
  CANNOT_PUT_PIECE,
  IS_SPECTATOR,
} from '../../constants/error';

class Organizer {
  games = {};

  leaveGame = (game, player) => {
    if (game) {
      const isEmpty = game.removePlayer(player);
      if (isEmpty) {
        this.games = R.omit([game.id], this.games);
      }
      return Promise.resolve();
    }
    return Promise.reject({
      details: NO_GAME,
    });
  }

  createGame = (player, id) => {
    const newPlayer = new Player(player);
    return [new Game(id, newPlayer), newPlayer];
  }

  setAsReady = (game, player) => {
    try {
      game.setAsReady(player);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject({
        details: IS_SPECTATOR,
      });
    }
  }

  joinGame = ({ id, player }) => {
    const game = this.games[id];

    if (game) {
      if (game.isGameFull()) {
        return Promise.reject({
          details: IS_FULL,
        });
      }
      const newPlayer = new Player(player);
      try {
        game.addPlayer(newPlayer);
        return Promise.resolve({
          game,
          player: newPlayer,
        });
      } catch (e) {
        return Promise.reject({
          details: ALREADYTAKEN,
        });
      }
    }
    const [newGame, newPlayer] = this.createGame(player, id);
    this.games = { ...this.games, [newGame.id]: newGame };
    return Promise.resolve({
      game: newGame,
      player: newPlayer,
    });
  }

  putPiece = (game, player, index) => {
    try {
      game.putPiece(player, index);
      return Promise.resolve();
    } catch (e) {
      logerror(e);
      return Promise.reject({
        details: CANNOT_PUT_PIECE,
      });
    }
  }
}

const createOrganizer = () => new Organizer();

export default createOrganizer;
