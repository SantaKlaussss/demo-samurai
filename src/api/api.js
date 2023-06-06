import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { "API-KEY": "1481c34b-b9da-4bc9-964a-b8cadc4bc613" }
});

export const usersAPI = {

  async getUsers(currentPage = 1, pageSize = 10) {
    let response = await fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`);
    let result = response.json()
    return result
  },

  follow(userId = 2) {
    return instance.post(`follow/${userId}`)
      .then(data => {
        return data.data
      })
  },

  unfollow(userId = 2) {
    return instance.delete(`follow/${userId}`)
      .then(data => {
        return data.data
      })
  },

  getProfile(userId) {
    console.warn('Obsolete method. P;eas profileAPI object')
    return profileAPI.getProfile(userId);
  }
}

export const profileAPI = {

  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },

  updateStatus(status) {
    return instance.put(`profile/status/`, { status })
  },

  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  saveProfile(profile) {
    return instance.put(`profile`, profile)
    }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
      .then(data => {
        return data.data
      })
  },

  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha })
      .then(data => {
        return data.data
      })
  },

  logout() {
    return instance.delete(`auth/login`)
      .then(data => {
        return data.data
      })
  },
};

export const securityAPI = {

  getCaptchaURL() {
    return instance.get(`security/get-captcha-url`);
  }
} 
