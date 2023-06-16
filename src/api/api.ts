import { UserType } from './../types/types';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { "API-KEY": "1481c34b-b9da-4bc9-964a-b8cadc4bc613" }
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type APIResponseType<D = {} ,RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
