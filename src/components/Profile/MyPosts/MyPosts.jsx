import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators.ts';
import { Textarea } from '../../common/FormsControls/FormsControls.tsx';

const MyPosts = (props) => {

  let postsElements = [...props.posts]
    .reverse()
    .map(item =>
    <Post key={item.id} likesCount={item.likesCount} message={item.message} />)
  
  let onAddPost = (values) => {
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

const AddNewPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={'Добавь пост'} name={'newPostText'} component={Textarea}
          validate={[required, maxLength10]} />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const MyPostsReduxForm = reduxForm({ form: 'newPostText' })(AddNewPostsForm)


export default MyPosts;
