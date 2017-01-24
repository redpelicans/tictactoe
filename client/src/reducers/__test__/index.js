import chai from 'chai';
import game from '../game';
import { putPiece, resetMap } from '../../actions/game';

const { describe, it } = global;
const { expect } = chai;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'player2',
};

const initialGameState = {
  size: 9,
  board: new Array(9).fill(null),
  player: {
    playing: player1,
    player1,
    player2,
  },
  winner: null,
  isFinished: false,
};

describe('[UT] game reducer', () => {
  const firstStepState = game(initialGameState, putPiece(0));
  it('should put a piece 1', () => {
    expect(firstStepState).to.deep.equal({
      size: 9,
      board: [
        player1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      winner: null,
      isFinished: false,
      player: {
        playing: player2,
        player1,
        player2,
      },
    });
  });

  const secondStepTest = game(firstStepState, putPiece(1));
  it('should put a piece 2', () => {
    expect(secondStepTest).to.deep.equal({
      size: 9,
      board: [
        player1,
        player2,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      winner: null,
      isFinished: false,
      player: {
        playing: player1,
        player1,
        player2,
      },
    });
  });
});
