import {getAuthUserData} from "./auth-reducer.ts";


const INITIALIZED_SUCCESS = 'SET_INITIALIZED';

type InitialStateType = {
  initialized: boolean
}
let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action:any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
};
type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType  => ({ type: 'SET_INITIALIZED' });

export const initializeApp = () => {
  return (dispatch:any) => {
    let promiss = dispatch(getAuthUserData());

    Promise.all([promiss])
    .then(() => {
      dispatch(initializedSuccess())
    });
  }
}

export default appReducer;
