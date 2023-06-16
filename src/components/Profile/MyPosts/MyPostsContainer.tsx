import { actionsProfile } from '../../../redux/profile-reducer.ts';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts.tsx';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store.ts'

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  } as MapPropsType
} 

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actionsProfile.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
