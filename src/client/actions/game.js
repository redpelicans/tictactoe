import {
  PUT_PIECE,
  REPLAY,
} from '../../constants/socket';

export const putPiece = coord => ({
  type: PUT_PIECE,
  payload: coord,
});

export const replay = () => ({
  type: REPLAY,
});
