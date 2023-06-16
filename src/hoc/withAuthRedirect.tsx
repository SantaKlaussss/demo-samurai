import { Navigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { AppStateType } from '../redux/redux-store'

  let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
  } as MapStateToPropsType);

type MapStateToPropsType = {
  isAuth: boolean
}

type MapDispatchToPropsType = {
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) { // HOC does container for auth
  const RedirectComponent: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    let {isAuth, ...restProps} = props

      if (props.isAuth == false) { return <Navigate to='/login' /> }
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, MapDispatchToPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {fake: () => {}})(RedirectComponent)

  return ConnectedAuthRedirectComponent;
}
