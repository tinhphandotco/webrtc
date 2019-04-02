import {
  makeActionsType
} from "utils/common";

const prefixType = "uiState.actions";
export const prefixToastActions = makeActionsType(prefixType);

export const TOGGLE_CHAT = prefixToastActions("TOGGLE_CHAT");
export const TOGGLE_GRID_LAYOUT = prefixToastActions("TOGGLE_GRID_LAYOUT");
export const TOGGLE_TOOLBAR = prefixToastActions("TOGGLE_TOOLBAR");
