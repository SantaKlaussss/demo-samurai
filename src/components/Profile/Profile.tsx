import React from "react"
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx'
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx'
import { ProfileInfoPropsType } from './ProfileInfo/ProfileInfo.tsx'

const Profile: React.FC<ProfileInfoPropsType> = (props) => {
  
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
