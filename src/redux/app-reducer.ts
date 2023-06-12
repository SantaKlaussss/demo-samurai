import {getAuthUserData} from "./auth-reducer.ts";
import { InferActionsTypes } from "./redux-store.ts";

let initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actionsReducer>

export const actionsReducer = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = () => {
  return (dispatch: any) => {
    let promiss = dispatch(getAuthUserData());

    return Promise.all([promiss])
    .then(() => {
      dispatch(actionsReducer.initializedSuccess())
    });
  }
}

export default appReducer;
