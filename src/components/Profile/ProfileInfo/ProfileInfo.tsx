import React, { ChangeEvent, useState } from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader.tsx';
import anonim from '../../../assets/images/anonim.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx';
import ProfileDataForm from './ProfileDataForm.tsx';
import { ProfileType } from '../../../types/types.ts';

export type ProfileInfoPropsType = {
  profile: ProfileType | null
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => Promise<any>
  isOwner: boolean
  status: string
  updateStatus: (status: string) => void
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

  let [editMode, setEditMode] = useState<boolean>(false)

  if (!props.profile) {
    return <Preloader />
  };

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    })
  };

  return (
    <div>
      <div className={styles.descriptionBlock}>
        <img src={props.profile.photos.large || anonim}
          alt="No name" className={styles.avatarAnanimus} />
        {(props.isOwner) && <input type='file' onChange={onMainPhotoSelected} />} <p></p>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />        <p></p>

        {editMode
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
          : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)} />}
      </div>
    </div>
  )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {

  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
      <div><b>My full name:</b>{profile.fullName}</div>
      <div><b>About me: </b>{profile.aboutMe}</div>
      <div><b>Рабочий статус:</b> {
        (profile.lookingForAJob)
          ? 'yes'
          : 'no'
      }</div>
      <div><b>My professional skils:</b> {profile.lookingForAJobDescription}</div>
      <div>
        <b>Contacts:</b>
        {Object
          .keys(profile.contacts)
          .map((key) => {
            return <Contact 
                      key={key} 
                      contactTitle={key} 
                      contactValue={profile.contacts[key]} />
        })}
      </div>
    </div>
  )
}

type ContactPropType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactPropType> = ({ contactTitle, contactValue }) => {
  return <div style={{ marginLeft: "10px" }}> <b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;
