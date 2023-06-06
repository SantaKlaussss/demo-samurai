import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATE = 'samurai-network/auth/SET-USER-DATE';
const SET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/SET-CAPTCHA-URL-SUCCESS';

let initialState = {
  userId: null as number | null,
  email: null as string | null ,
  login: null as string | null,
  isAuth: false,
  autorizedUserId: null as boolean | null,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATE:
    case SET_CAPTCHA_URL_SUCCESS:
      return {
        userIeerk4d: '123',
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

type SetAuthUserDateActionPayloadType = {
  userId: number | null 
  email: string | null
  login: string | null
  isAuth: boolean
}
type SetAuthUserDateActionType = {
  type: typeof SET_USER_DATE
  payload: SetAuthUserDateActionPayloadType
}

export const setAuthUserDate = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDateActionType => ({ type: 'samurai-network/auth/SET-USER-DATE', payload: { userId, email, login, isAuth } });


type SetCaptchaUrlSuccessActionType = {
  type: typeof SET_CAPTCHA_URL_SUCCESS
  payload: { captchaUrl: string }
}

export const setCaptchaUrlSuccess = (captchaUrl: string): SetCaptchaUrlSuccessActionType => ({ type: 'samurai-network/auth/SET-CAPTCHA-URL-SUCCESS', payload: { captchaUrl } });


export const getAuthUserData = () => async (dispatch: any) => {

  let response = await authAPI.me();
  if (response.resultCode === 0) {
    let { id, login, email } = response.data;
    dispatch(setAuthUserDate(id, email, login, true));
  }
}
export const login = (email: string, password: number, rememberMe: boolean, captcha: any) => async (dispatch: any) => {

  let response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.resultCode === 0) {
    getAuthUserData();
  } else {

    if (response.resultCode === 10) {
      dispatch(getCaptchaURL());
    }

    let message = response.messages.length > 0 ? response.messages[0] : 'Common error';
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const getCaptchaURL = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptchaURL();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {

  let responce = await authAPI.logout();
  if (responce.resultCode === 0) {
    dispatch(setAuthUserDate(null, null, null, false));
  }
}

export default authReducer;
