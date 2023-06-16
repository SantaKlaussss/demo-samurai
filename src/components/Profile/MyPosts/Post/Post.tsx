import React from 'react';
import style from './Post.module.css';
import { PostsType } from '../../../../types/types.ts';

const Post: React.FC<PostsType> = (props) => {

  return (
    <div className={style.item}>
      <img src="https://avatars.mds.yandex.net/i?id=212dc039abbe9d590d1d86156e3011eb789a83e6-5210205-images-thumbs&ref=rim&n=33&w=188&h=150" alt="" />
      {props.message}
      <div>
        <span>like {props.likesCount}</span>
      </div>
    </div>
  )
}

export default Post;
