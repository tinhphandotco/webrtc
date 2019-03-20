import { PlayerAPI } from 'api';
import * as ActionTypes from './constants';

export const getasd = (params) => {
  return (dispatch) => {
    // dispatch({ type: ActionTypes.FETCH_PLAYERS_REQUEST });

    // PlayerAPI.getListPlayers(params)
    //   .then((data) => {
    //     dispatch({ type: ActionTypes.FETCH_PLAYERS_SUCCESS, payload: data });
    //     dispatch({ type: ActionTypes.CHANGE_PLAYER, payload: { playerId: data.allIds[0] } })
    //   })
    //   .catch((error) => {
    //     dispatch({ type: ActionTypes.FETCH_PLAYERS_FAILURE, payload: { message: error.message } });
    //   })
  }
}

export const joinRoom = (roomName) => {
  return { type: ActionTypes.JOIN_ROOM, payload: { roomName } };
}