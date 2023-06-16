import React from "react";
import Header, { DispatchHeaderType, MapHeaderType } from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.ts";
import {AppStateType} from '../../redux/redux-store.ts'; 

class HeaderComponent extends React.Component<MapHeaderType & DispatchHeaderType> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
} as MapHeaderType);

export default connect<MapHeaderType, DispatchHeaderType, {} , AppStateType>(mapStateToProps, { logout })(HeaderComponent);
