import React from 'react';
import { connect } from 'react-redux';
import { follow, requestUsers, unfollow } from "../../redux/users-reducer.ts";
import Users from './Users.tsx';
import Preloader from '../common/Preloader/Preloader.tsx';
import { Navigate } from 'react-router-dom';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsAuth, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors.ts';
import { UserType } from '../../types/types.ts';
import { AppStateType } from '../../redux/redux-store.ts';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  isAuth: boolean
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  requestUsers: (currentPage: number, pageSize: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    let {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }; //запрос на сервер  за  users 

  onPageChanged = (pageNumber: number) => {
    let {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize);
  }; //Странички

  render() {
    if (this.props.isAuth == false) { return <Navigate to='/login' /> }
    return <>
    <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    isAuth: getIsAuth(state),
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
  (mapStateToProps,
  { follow, unfollow, requestUsers }))(UsersContainer)
