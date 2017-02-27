
/*
*   Checks :
*   - - >
*/
const line = index => (board) => {
  const toFind = board[index];
  if (!toFind) return false;
  if (board[index + 1] === toFind && board[index + 2] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   |
*   |
*   .
*/
const column = index => (board) => {
  const toFind = board[index];
  if (!toFind) return false;
  if (board[index + 3] === toFind && board[index + 6] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   * . .
*   . * .
*   . . *
*/
const crookedDownwards = (board) => {
  const toFind = board[0];
  if (!toFind) return false;
  if (board[4] === toFind && board[8] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   . . *
*   . * .
*   * . .
*/
const crookedUpwards = (board) => {
  const toFind = board[2];
  if (!toFind) return false;
  if (board[4] === toFind && board[6] === toFind) return toFind;
  return false;
};

export default [
  line(0),
  line(3),
  line(6),
  column(0),
  column(1),
  column(2),
  crookedUpwards,
  crookedDownwards,
];
