export type PostsType = {
  id: number
  message: string
  likesCount: number
}

export type ContanctsType = {
  github: string
  VK: string
  facebook: string
  instagramm: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContanctsType
  photos: PhotosType
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}
