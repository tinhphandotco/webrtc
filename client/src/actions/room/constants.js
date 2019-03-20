import {
  makeActionsType
} from "utils/common";

const prefixType = "room.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const JOIN_ROOM = prefixToastActions("JOIN_ROOM");
