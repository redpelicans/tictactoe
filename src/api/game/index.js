/* eslint-disable no-underscore-dangle */
import EventEmitter from 'events';
import R from 'ramda';
import patterns from './patterns';
// import { loginfo } from '../util';
import {
  START,
  LEFT,
  JOINED,
  YOUR_TURN,
  PIECE_SET,
  END,
  READY,
  WAITING,
} from '../../constants/socket';

export default class Game extends EventEmitter {
  constructor(id, player) {
    super();
    this.id = id;
    this.status = WAITING;
    this.players = {
      [player.username]: player,
    };
    this.board = R.times(() => null, 9);
    this.playing = {};
  }

  getPlayers = () => R.values(this.players);
  areBothReady = () => R.values(R.pickBy(val => !!val.isReady, this.players)).length === 2
  isGameFull = () => R.values(this.players).filter(player => !player.isSpectator).length > 1
  findWinner = () => patterns.find(pattern => pattern(this.board))
  checkFull = () => this.board.indexOf(null) === -1

  addPlayer = (newPlayer) => {
    const { username } = newPlayer;
    const nameAlreadyTaken = !!this.players[username];
    if (nameAlreadyTaken) {
      throw new Error('username already taken');
    }
    this.players = { ...this.players, [username]: newPlayer };
    this.emit(JOINED);
  }

  removePlayer = (playerToRemove) => {
    this.players = R.omit([playerToRemove.username], this.players);
    this.status = WAITING;
    this.emit(LEFT);
    return R.isEmpty(this.players);
  }

  getOtherPlayer = playerA =>
    R.values(this.players).find(playerB => !R.equals(playerB, playerA)) || null;

  startGame = () => {
    this.emit(START);
    this.status = READY;
    const players = R.values(this.players);
    this.playing = players[Math.round(Math.random())];
    this.emit(YOUR_TURN, this.playing.username);
  }

  setAsReady = (player) => {
    if (this.status === READY) return;
    const confirmedPlayer = this.players[player.username];
    confirmedPlayer.setReady();
    this.emit(READY, player.username);
    if (this.areBothReady()) {
      this.startGame();
    }
  }

  prepareNext = () => {
    const players = this.getPlayers();
    R.map(el => el.unsetReady(), players);
    this.board = R.times(() => null, 9);
  }

  putPiece = (player, index) => {
    if (this.status === WAITING) return;
    if (this.board[index]) {
      throw new Error('cell unavailable');
    }
    if (this.playing.username !== player.username) {
      throw new Error('not your turn');
    }
    this.board = this.board.map((cell, i) => {
      if (i === index && !cell) return player;
      return cell;
    });
    this.emit(PIECE_SET, index);
    this.playing = this.getOtherPlayer(player);

    const isThereAWinner = this.findWinner();
    if (isThereAWinner) {
      this.winner = isThereAWinner(this.board);
      this.emit(END, {
        winner: this.winner,
        message: 'we have a winner',
      });
      this.status = WAITING;
      this.prepareNext();
      return;
    }

    this.full = this.checkFull();
    if (this.full) {
      this.emit(END, {
        winner: null,
        message: 'game is full',
      });
      this.status = WAITING;
      this.prepareNext();
    }
  }

}
