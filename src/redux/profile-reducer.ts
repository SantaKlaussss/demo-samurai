import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api.ts";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { profileAPI } from "../api/profile-api.ts";
import { error } from "console";

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'Its, how are you?', likesCount: 10 },
    { id: 3, message: 'Привет как дела KAMA PULYA', likesCount: 12 },
    { id: 4, message: 'not kils?', likesCount: 10 },
    { id: 5, message: 'Фашисты работают над документацией', likesCount: 12 },
    { id: 6, message: 'Димыч красавчик', likesCount: 10 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '' 
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType  => {

  switch (action.type) {
    case "ADD-POST": {
      let newPost = {
        id: 5,
        message: action.newPostText, 
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      }
    };

    case "SET-USER-PROFILE":
      return { ...state, profile: action.profile };

    case "SET-STATUS":
      return {...state, status: action.status };

    case "DELETE-POST":
      return { ...state, posts: state.posts.filter((u) => u.id != action.postId) }

    case "SAVE-PHOTO-SUCCESS":
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };

    default:
      return state
  }
}

type ActionTypes = InferActionsTypes<typeof actionsProfile>

export const actionsProfile = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD-POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET-USER-PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SET-STATUS', status } as const),
  deletedPosts: (postId: number) => ({ type: 'DELETE-POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE-PHOTO-SUCCESS', photos } as const),
}

export const getUserProfile = (userId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actionsProfile.setUserProfile(data));
};
export const getStatus = (userId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
  let status = await profileAPI.getStatus(userId);
  
  dispatch(actionsProfile.setStatus(status));
};
export const updateStatus = (status: string): BaseThunkType<ActionTypes> => async (dispatch) => {
  let updateStatus = await profileAPI.updateStatus(status);
  
  if (updateStatus.resultCode === ResultCodesEnum.Success) {
    dispatch(actionsProfile.setStatus(status));
  }
};
export const savePhoto = (file: File): BaseThunkType<ActionTypes> => async (dispatch) => {
  let photo = await profileAPI.savePhoto(file);
  if (photo.resultCode === ResultCodesEnum.Success) {
    dispatch(actionsProfile.savePhotoSuccess(photo.data));
  }
};
export const saveProfile = (profile: ProfileType): BaseThunkType<ActionTypes> => async (dispatch, getState) => {  
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  
  if (data.resultCode === ResultCodesEnum.Success) {
    if (userId != null) {
      dispatch(getUserProfile(userId))
    }
    else {
      throw new Error('userId cant be null')
    }
  } else {
    dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
    return Promise.reject(data.messages)
  }
};

export default profileReducer;
