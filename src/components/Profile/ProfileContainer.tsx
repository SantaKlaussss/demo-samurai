import React from 'react';
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer.ts';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store.ts';
import { ProfileType } from '../../types/types.ts';

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (text: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type OwnPropsType = {
  params: any
}

type PropsType = MapStateToPropsType & MapDispatchPropType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = this.props.params.userId;
    if (!userId) {
      userId = this.props.autorizedUserId;
    }
    if (!userId) {
      throw new Error('UserId equals null')
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.params.userId !== prevProps.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.params.userId}
        savePhoto={this.props.savePhoto} />
    )
  }
};

let AuthRedirectComponent = withAuthRedirect(ProfileContainer); //ХОК создающий контейнер для компонента

type MapStateToPropsForRedirectType = {
  isAuth: boolean
}
let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsForRedirectType => ({
  isAuth: state.auth.isAuth
});

AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

function withRouter(Component: React.FC<PropsType>) {
  function ComponentWithRouterProp(props: PropsType) {
    let params = useParams();
    return (
      <Component
        {...props}
        params={params}
      />
    )
  }

  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter
)(ProfileContainer)
