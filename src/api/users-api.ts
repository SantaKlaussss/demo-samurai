import { GetItemsType, ResultCodesEnum, instance, APIResponseType } from "./api.ts";

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
  },

  follow(userId: number) {
    return instance.post<APIResponseType<{}, ResultCodesEnum>>(`follow/${userId}`).then(res => res.data)
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(res => res.data.data) as Promise<APIResponseType>
  },

}
