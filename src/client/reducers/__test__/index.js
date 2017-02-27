import chai from 'chai';
import R from 'ramda';
import game from '../game';
import {
  PIECE_SET,
  REPLAY,
  OTHER_READY,
  YOUR_TURN,
  HIS_TURN,
  LEFT,
  START,
  JOINED,
  END,
} from '../../../constants/socket';

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
  board: R.times(() => null, 9),
  player: {
    playing: player1,
    me: player1,
    him: player2,
  },
  winner: null,
  isFinished: false,
};

describe('[UT] game reducer', () => {
  const firstStepState = game(initialGameState, { type: PIECE_SET, payload: 0 });
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
        me: player1,
        him: player2,
      },
    });
  });

  const secondStepTest = game(firstStepState, { type: PIECE_SET, payload: 1 });
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
        me: player1,
        him: player2,
      },
    });
  });

  it('should set me as ready on REPLAY', () => {
    const firstStep = game(initialGameState, { type: REPLAY });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      player: {
        ...initialGameState.player,
        me: {
          ...player1,
          isReady: true,
        },
      },
    });
  });

  it('should set him as ready on OTHER_READY', () => {
    const firstStep = game(initialGameState, { type: OTHER_READY });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      player: {
        ...initialGameState.player,
        him: {
          ...player2,
          isReady: true,
        },
      },
    });
  });

  it('should set playing as me on YOUR_TURN', () => {
    const firstStep = game(initialGameState, { type: YOUR_TURN });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      player: {
        ...initialGameState.player,
        playing: initialGameState.player.me,
      },
    });
  });

  it('should set playing as him on HIS_TURN', () => {
    const firstStep = game(initialGameState, { type: HIS_TURN });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      player: {
        ...initialGameState.player,
        playing: initialGameState.player.him,
      },
    });
  });

  it('should remove a player on LEFT', () => {
    const firstStep = game(initialGameState, { type: LEFT });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      player: {
        ...initialGameState.player,
        him: { name: 'NO PLAYER' },
      },
    });
  });

  it('should start a game on START', () => {
    const firstStep = game(initialGameState, { type: START });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      board: R.times(() => null, 9),
      winner: null,
      isFinished: null,
    });
  });

  it('should add a player on JOINED', () => {
    const me = { name: 'me' };
    const id = 'id';
    const firstStep = game(initialGameState, {
      type: JOINED,
      payload: {
        me,
        id,
      },
    });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      name: id,
      player: {
        ...initialGameState.player,
        me: {
          ...initialGameState.player.me,
          name: me.username,
        },
        him: {
          ...initialGameState.player.him,
          name: 'NO PLAYER',
        },
      },
    });
  });

  it('should end a game on END', () => {
    const payload = {
      winner: { username: 'winner' },
    };
    const firstStep = game(initialGameState, { type: END, payload });
    expect(firstStep).to.deep.equal({
      ...initialGameState,
      winner: { name: payload.winner.username },
      player: {
        ...initialGameState.player,
        me: {
          ...initialGameState.player.me,
          isReady: false,
        },
        him: {
          ...initialGameState.player.him,
          isReady: false,
        },
      },
      isFinished: !payload.winner,
    });
  });

  it('should return the state by default', () => {
    const firstStep = game(initialGameState, { type: 'TEST_DEFAULT' });
    expect(firstStep).to.deep.equal(initialGameState);
  });
});
