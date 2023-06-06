import { PhotosType, UserType } from './../types/types';
import { usersAPI } from "../api/api";
import objectUpdateInArray from "../utils/validators/objectHelpers";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE-IS-FOLLOWING-PROGRES';


let initialState = {
  users: [] as Array<UserType>,
  pageSize: 50,
  totalUsersCount: 0, 
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //массив чисел айдишек
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: objectUpdateInArray(state.users, action.userId, 'id', {followed: true})
        }
    case UNFOLLOW:
      return {
        ...state,
        users: objectUpdateInArray(state.users, action.userId, 'id', { followed: false })
      }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_USERS_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.count }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_IS_FOLLOWING_PROGRES:
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

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });

type SetTotalUsersCountActionType = {
  type: typeof SET_USERS_TOTAL_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_USERS_TOTAL_COUNT, count: totalUsersCount });

type ToggleIsFetchingtActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetchingt = (isFetching: boolean): ToggleIsFetchingtActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowingProgressAcyionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRES
  isFetching: boolean
  userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAcyionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFetching, userId });

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleIsFetchingt(true));
  let response = await usersAPI.getUsers(page, pageSize);
  dispatch(setCurrentPage(page));
  dispatch(toggleIsFetchingt(false));
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {

  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;
