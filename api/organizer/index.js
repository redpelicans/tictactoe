import R from 'ramda';
import Game from '../game';
import Player from '../player';
import {
  JOINED,
  REMOVED,
  ISFULL,
  NOGAME,
  ALREADYTAKEN,
  SUCCESS,
  ISSPECTATOR,
} from '../constants';

class Organizer {
  games = {};

  leaveGame = (game, player) => {
    if (game) {
      const isEmpty = game.removePlayer(player);
      if (isEmpty) {
        this.games = R.omit([game.id], this.games);
      }
      return Promise.resolve({
        details: REMOVED,
      });
    }
    return Promise.reject({
      details: NOGAME,
    });
  }

  createGame = (player, id) => {
    const newPlayer = new Player(player);
    return [new Game(id, newPlayer), newPlayer];
  }

  setAsReady = (game, player) => {
    try {
      game.setAsReady(player);
      return Promise.resolve({
        details: SUCCESS,
      });
    } catch (e) {
      return Promise.reject({
        details: ISSPECTATOR,
      });
    }
  }

  joinGame = ({ id, player }) => {
    const game = this.games[id];

    if (game) {
      if (game.isGameFull()) {
        return Promise.reject({
          details: ISFULL,
        });
      }
      const newPlayer = new Player(player);
      try {
        game.addPlayer(newPlayer);
        return Promise.resolve({
          message: JOINED,
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
      message: JOINED,
      game: newGame,
      player: newPlayer,
    });
  }
}

const createOrganizer = () => new Organizer();

export default createOrganizer;
