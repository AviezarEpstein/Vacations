import { AppState } from "./AppState";
import { ActionType } from "./ActionType";
import { Action } from "./Action";

// This function is NOT called direcrtly by you
export function reduce(
  oldAppState: AppState = new AppState(),
  action: Action
): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.GetAllVacations:
      newAppState.vacations = action.payload;
      break;
    case ActionType.ChangeLoginLogout:
      newAppState.isLogedIn = action.payload;
      break;
    case ActionType.HandleDeleteEdit:
      newAppState.isAdmin = action.payload;
      break;
    case ActionType.GetVacationById:
      newAppState.vacation = action.payload;
      break;
    case ActionType.SetShowModal:
      newAppState.showModal = action.payload;
      break;
    case ActionType.GetCurrentUserName:
      newAppState.currentUserName = action.payload;
      break;
    case ActionType.ChangeButtonAddEditVacation:
      newAppState.isAddVacation = action.payload;
      break;
    case ActionType.ChangeIsFollow:
      newAppState.isFollow = action.payload;
      break;
    case ActionType.GetFollowedVacations:
      newAppState.followedVacations = action.payload;
      break;
    case ActionType.ShowErrors:
      newAppState.errors = action.payload;
      break;
  }
  return newAppState;
}
