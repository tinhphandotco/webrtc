import {
  makeActionsType
} from "utils/common";

const prefixType = "devices.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const SET_DEVICES = prefixToastActions("SET_DEVICES");
