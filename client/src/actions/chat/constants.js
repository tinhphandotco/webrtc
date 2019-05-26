import {
  makeActionsType
} from "utils/common";

const prefixType = "chat.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const SEND_MESSAGE = prefixToastActions("SEND_MESSAGE");
export const RECEIVE_MESSAGE = prefixToastActions("RECEIVE_MESSAGE");
export const MESSAGE_SUCCESS = prefixToastActions("MESSAGE_SUCCESS");
export const MESSAGE_ERROR = prefixToastActions("MESSAGE_ERROR");
export const LIST_MESSAGES = prefixToastActions("LIST_MESSAGES");
