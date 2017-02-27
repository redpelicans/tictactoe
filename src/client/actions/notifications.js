export const ADD_NOTIF = 'ADD_NOTIF';
export const REMOVE_NOTIF = 'REMOVE_NOTIF';

export const addNotif = text => ({
  type: ADD_NOTIF,
  payload: text,
});

export const removeNotif = id => ({
  type: REMOVE_NOTIF,
  payload: id,
});
