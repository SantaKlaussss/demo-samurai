import React from "react";
import Header from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.ts";
import {AppStateType} from '../../redux/redux-store'; 

type MapStateToPropsType = {
  isAuth: boolean
  login: string
}

type MapDispatchPropsType = {
  logout: () => void
}

type HeaderComponentType = MapStateToPropsType & MapDispatchPropsType

class HeaderComponent extends React.Component<HeaderComponentType> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderComponent);
