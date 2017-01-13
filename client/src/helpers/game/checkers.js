import * as patterns from './patterns';

export const win = (map) => {
  let toFind;

  toFind = patterns.line(map, 0);
  if (toFind) return toFind;
  toFind = patterns.line(map, 3);
  if (toFind) return toFind;
  toFind = patterns.line(map, 6);
  if (toFind) return toFind;

  toFind = patterns.column(map, 0);
  if (toFind) return toFind;
  toFind = patterns.column(map, 1);
  if (toFind) return toFind;
  toFind = patterns.column(map, 2);
  if (toFind) return toFind;


  toFind = patterns.checkCrookedUpwards(map);
  if (toFind) return toFind;

  toFind = patterns.checkCrookedDownwards(map);
  return toFind;
};

export const full = map => map.indexOf(null) === -1;
