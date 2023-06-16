import { BaseThunkType, InferActionsTypes } from './redux-store.ts';
import { UserType } from './../types/types.ts';
import objectUpdateInArray from "../utils/validators/objectHelpers.ts";
import { Dispatch } from 'redux';
import { usersAPI } from '../api/users-api.ts';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 50,
  totalUsersCount: 0, 
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //массив чисел айдишек
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: objectUpdateInArray(state.users, action.userId, 'id', {followed: true})
        }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: objectUpdateInArray(state.users, action.userId, 'id', { followed: false })
      }
    case 'SN/USERS/SET_USERS':
      return { ...state, users: action.users }
    case 'SN/USERS/SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage }
    case 'SN/USERS/SET_USERS_TOTAL_COUNT':
      return { ...state, totalUsersCount: action.count }
    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRES':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    default:
      return state
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_USERS_TOTAL_COUNT', count: totalUsersCount } as const),
  toggleIsFetchingt: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRES', isFetching, userId } as const),
}

export const requestUsers = (page: number, pageSize: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
  dispatch(actions.toggleIsFetchingt(true));
  let response = await usersAPI.getUsers(page, pageSize);
  dispatch(actions.setCurrentPage(page));
  dispatch(actions.toggleIsFetchingt(false));
  dispatch(actions.setUsers(response.items));
  dispatch(actions.setTotalUsersCount(response.totalCount));
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {

  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): BaseThunkType<ActionsTypes> => { 
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
  }
}

export const unfollow = (userId: number): BaseThunkType<ActionsTypes> => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
  }
} 

export default usersReducer;
