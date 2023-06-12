import { stopSubmit } from 'redux-form';
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api.ts";
import { BaseThunkType, InferActionsTypes } from './redux-store.ts';
import { authAPI } from '../api/auth-api.ts';
import { securityAPI } from '../api/security-api.ts';

let initialState = {
  userId: null as number | null,
  email: null as string | null ,
  login: null as string | null,
  isAuth: false,
  autorizedUserId: null as boolean | null,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET-USER-DATE':
    case 'SET-CAPTCHA-URL-SUCCESS':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actionsAuth>;

export const actionsAuth = {
  setAuthUserDate: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'SET-USER-DATE', payload: { userId, email, login, isAuth } }),

  setCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SET-CAPTCHA-URL-SUCCESS', payload: { captchaUrl } })
}

export const getAuthUserData = () => async (dispatch: any) => {
  let meData = await authAPI.me();

  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data;
    dispatch(actionsAuth.setAuthUserDate(id, email, login, true));
  }
}

export const login = (email: string, password: number, rememberMe: boolean, captcha: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  
  if (response.resultCode === ResultCodesEnum.Success) {
    getAuthUserData();
  } else {

    if (response.resultCode === ResultCodeForCaptcha.CaptchIsRequired) {
      dispatch(getCaptchaURL());
    }

    let message = response.messages.length > 0 ? response.messages[0] : 'Common error';
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const getCaptchaURL = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
  let data = await securityAPI.getCaptchaURL();
  dispatch(actionsAuth.setCaptchaUrlSuccess(data.url));
}

export const logout = (): BaseThunkType<ActionsTypes> => async (dispatch) => {

  let responce = await authAPI.logout();
  if (responce.resultCode === 0) {
    dispatch(actionsAuth.setAuthUserDate(null, null, null, false));
  }
}

export default authReducer;
