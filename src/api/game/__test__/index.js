import chai from 'chai';
import R from 'ramda';
import Game from '../';
import Player from '../../player';
import { READY } from '../../../constants/socket';

const { describe, it } = global;
const { expect } = chai;

describe('class Game', () => {
  it('should create a game with the given id', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    expect(game.id).to.equal('42');
  });

  it('should create a game with the given player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    expect(game.players).to.deep.equal({
      usernameTest: {
        username: 'usernameTest',
        isReady: false,
        setReady: game.players.usernameTest.setReady,
        unsetReady: game.players.usernameTest.unsetReady,
      },
    });
  });

  it('should throw if the username is already taken', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest');
    expect(() => game.addPlayer(newPlayer2)).to.throw('username already taken');
  });

  it('should add another player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    expect(game.players).to.deep.equal({
      usernameTest: {
        username: 'usernameTest',
        isReady: false,
        setReady: game.players.usernameTest.setReady,
        unsetReady: game.players.usernameTest.unsetReady,
      },
      usernameTest2: {
        username: 'usernameTest2',
        isReady: false,
        setReady: game.players.usernameTest2.setReady,
        unsetReady: game.players.usernameTest2.unsetReady,
      },
    });
  });

  it('should give the other player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    const otherPlayer = game.getOtherPlayer(newPlayer);
    expect(otherPlayer).to.deep.equal({
      username: 'usernameTest2',
      isReady: false,
      setReady: game.players.usernameTest2.setReady,
      unsetReady: game.players.usernameTest2.unsetReady,
    });
  });

  it('should give all the players', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    const players = game.getPlayers();
    expect(players).to.deep.equal([
      {
        username: 'usernameTest',
        isReady: false,
        setReady: game.players.usernameTest.setReady,
        unsetReady: game.players.usernameTest.unsetReady,
      },
      {
        username: 'usernameTest2',
        isReady: false,
        setReady: game.players.usernameTest2.setReady,
        unsetReady: game.players.usernameTest2.unsetReady,
      },
    ]);
  });

  it('should know if both players are ready', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);

    const ready = game.areBothReady();
    expect(ready).to.equal(false);

    newPlayer2.isReady = true;
    const ready2 = game.areBothReady();
    expect(ready2).to.equal(false);

    newPlayer.isReady = true;
    const ready3 = game.areBothReady();
    expect(ready3).to.equal(true);
  });

  it('should remove a player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.removePlayer(newPlayer2);
    expect(game.players).to.deep.equal({
      usernameTest: {
        username: 'usernameTest',
        isReady: false,
        setReady: game.players.usernameTest.setReady,
        unsetReady: game.players.usernameTest.unsetReady,
      },
    });
    const empty = game.removePlayer(newPlayer);
    expect(empty).to.equal(true);
  });

  it('should set a player as ready', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    expect(newPlayer.isReady).to.equal(false);
    game.setAsReady(newPlayer);
    expect(newPlayer.isReady).to.equal(true);
    game.setAsReady(newPlayer2);
    expect(newPlayer2.isReady).to.equal(true);
  });

  it('should set a player as ready', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    expect(game.status).to.equal(READY);
  });

  it('should put a piece 1/3', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    const playing = game.playing;
    game.putPiece(game.playing, 0);
    expect(game.board).to.deep.equal([
      playing,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it('should put a piece 2/3', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    const playing0 = game.playing;
    game.putPiece(game.playing, 0);
    const playing1 = game.playing;
    game.putPiece(game.playing, 1);
    game.putPiece(game.playing, 2);
    game.putPiece(game.playing, 3);
    game.putPiece(game.playing, 4);
    expect(game.board).to.deep.equal([
      playing0,
      playing1,
      playing0,
      playing1,
      playing0,
      null,
      null,
      null,
      null,
    ]);
  });

  it('should put a piece 3/3', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    const playing0 = game.playing;
    game.putPiece(game.playing, 0);
    const playing1 = game.playing;
    game.putPiece(game.playing, 2);
    game.putPiece(game.playing, 1);
    game.putPiece(game.playing, 3);
    game.putPiece(game.playing, 5);
    game.putPiece(game.playing, 4);
    game.putPiece(game.playing, 6);
    game.putPiece(game.playing, 7);
    expect(game.board).to.deep.equal([
      playing0,
      playing0,
      playing1,
      playing1,
      playing1,
      playing0,
      playing0,
      playing1,
      null,
    ]);
  });

  it('should throw an error when you try to put a piece on a unavailable cell', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    game.putPiece(game.playing, 0);

    expect(() => game.putPiece(game.playing, 0)).to.throw('cell unavailable');
  });

  it('should throw an error when you try to put a piece not your turn', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    const firstPlaying = game.playing;
    game.putPiece(game.playing, 0);
    expect(() => game.putPiece(firstPlaying, 1)).to.throw('not your turn');
  });

  it('should not add a player if there is two', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    expect(game.isGameFull()).to.equal(true);
    game.removePlayer(newPlayer2);
    expect(game.isGameFull()).to.equal(false);
  });

  it('should end the game once she\'s full | DRAW', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    game.putPiece(game.playing, 0);
    game.putPiece(game.playing, 2);
    game.putPiece(game.playing, 1);
    game.putPiece(game.playing, 3);
    game.putPiece(game.playing, 5);
    game.putPiece(game.playing, 4);
    game.putPiece(game.playing, 6);
    game.putPiece(game.playing, 7);
    game.putPiece(game.playing, 8);
    expect(game.board).to.deep.equal(R.times(() => null, 9));
  });

  it('should end the game once she\'s full | DRAW', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.setAsReady(newPlayer);
    game.setAsReady(newPlayer2);
    R.times(index => game.putPiece(game.playing, index), 9);
    game.putPiece(game.playing, 8);
    expect(game.board).to.deep.equal(R.times(() => null, 9));
  });
});
