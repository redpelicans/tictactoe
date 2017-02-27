import patterns from './patterns';

export const win = board => patterns.find(pattern => pattern(board));
export const full = board => board.indexOf(null) === -1;
