import React from "react";
import style from "./users.module.css";
import userDefault from "../../assets/images/userDefault.jpg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types.ts";

type UserPropsType = {
  user: UserType
  follow: (userId: number) => void 
  unfollow: (userId: number) => void 
  followingInProgress: Array<number>
}

const User: React.FC<UserPropsType> = ({ user, follow, unfollow, followingInProgress }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img src={user.photos.small != null
              ? user.photos.small
              : userDefault}
              className={style.usersPhoto} />
          </NavLink>
        </div>
        <div>
          {user.followed

            ? <button disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => { unfollow(user.id) }}
            >Unfollow</button>

            : <button disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => { follow(user.id) }}
            >Follow</button>
          }
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.contry"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
