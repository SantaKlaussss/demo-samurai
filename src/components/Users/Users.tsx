import React from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { UserType } from "../../types/types.js";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (currentPage: number) => void
  users: Array<UserType>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}

let Users: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Paginator 
        currentPage={props.currentPage} 
        onPageChanged={props.onPageChanged}
        totalItemsCount={props.totalUsersCount} 
        pageSize={props.pageSize} 
      />
      <div>
        {props.users.map((user) => (
          <User 
            user={user} 
            follow={props.follow} 
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow} 
            key={user.id} 
          />))}
      </div>
    </div>
  );
};

export default Users;
