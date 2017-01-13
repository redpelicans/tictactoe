
/*
*   Checks :
*   - - >
*/
export const line = (map, index) => {
  const toFind = map[index];
  if (!toFind) return false;
  if (map[index + 1] === toFind && map[index + 2] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   |
*   |
*   .
*/
export const column = (map, index) => {
  const toFind = map[index];
  if (!toFind) return false;
  if (map[index + 3] === toFind && map[index + 6] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   * . .
*   . * .
*   . . *
*/
export const checkCrookedDownwards = (map) => {
  const toFind = map[0];
  if (!toFind) return false;
  if (map[4] === toFind && map[8] === toFind) return toFind;
  return false;
};

/*
*   Checks :
*   . . *
*   . * .
*   * . .
*/
export const checkCrookedUpwards = (map) => {
  const toFind = map[2];
  if (!toFind) return false;
  if (map[4] === toFind && map[6] === toFind) return toFind;
  return false;
};
