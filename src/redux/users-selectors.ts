import { UserType } from './../types/types';
import { AppStateType } from './redux-store';
import { createSelector } from 'reselect'

const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter( u => true);
}) // reselector - функция, которая вызывает getUsers только при изменении, а в стальном случае возвращает её копию

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
} 

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
} 

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
} 

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
} 

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
} 
