import { APIResponseType, ResultCodeForCaptcha, ResultCodesEnum, instance } from "./api.ts"

type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType, ResultCodesEnum>>(`auth/me`).then(res => res.data)
  },

  login(email: string, password: number, rememberMe = false, captcha: null | string = null) {
    return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
      .then(res => res.data)
  },

  logout() {
    return instance.delete(`auth/login`)
      .then(data => {
        return data.data
      })
  },
};
