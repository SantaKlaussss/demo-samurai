import React from "react";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from "../../types/types";

type PropsType = {
  savePhoto: () => void
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: () => void
  saveProfile: () => void
}

const Profile: React.FC<PropsType> = (props) => {
  
  return (
    <div>
      <ProfileInfo 
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        saveProfile={props.saveProfile} 
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;
