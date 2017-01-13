export const PUT_PIECE = 'PUT_PIECE';
export const RESET_MAP = 'RESET_MAP';

export const putPiece = coord => ({
  type: PUT_PIECE,
  payload: coord,
});

export const resetMap = () => ({
  type: RESET_MAP,
});
