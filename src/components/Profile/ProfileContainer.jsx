import React from 'react';
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer.ts';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.autorizedUserId;
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
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

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth
});

AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
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

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter
)(ProfileContainer)
