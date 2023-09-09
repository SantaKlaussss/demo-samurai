import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post.tsx';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators.ts';
import { GetStringKeys, Input, createField } from '../../common/FormsControls/FormsControls.tsx';
import { PostsType } from '../../../types/types.ts';

export type MapPropsType = {
  posts: Array<PostsType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  let postsElements = [...props.posts]
    .reverse()
    .map(item =>
    <Post key={item.id} likesCount={item.likesCount} message={item.message} />)
  
  let onAddPost = (values: any) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={style.postsBlock}>
      <h3>my post</h3>
      <div>
        <MyPostsReduxForm onSubmit={onAddPost} />
      </div>
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  )
}

let maxLength10 = maxLengthCreator(10) // валидатор на колличество символов в постах

type AddPostNewPostText = {
  newPostText: string;
}
type AddNewPostTextKeysType = GetStringKeys<AddPostNewPostText>
// React.FC<InjectedFormProps<AddNewPostTextKeysType>>
const AddNewPostsForm = (props: { handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined; }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddNewPostTextKeysType>("your post", "newPostText", Input, [required, maxLength10])} 
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const MyPostsReduxForm = reduxForm({ form: 'newPostText' })(AddNewPostsForm)

export default MyPosts;
