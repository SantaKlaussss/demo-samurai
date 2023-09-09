import React from "react";
import { GetStringKeys, Input, Textarea, createField } from "../../common/FormsControls/FormsControls.tsx";
import { reduxForm, InjectedFormProps } from "redux-form";
import styles from '../../common/FormsControls/FormsControls.module.css';
import { ProfileType } from "../../../types/types.ts";

type ProfileDataFormType = {
  profile: ProfileType
} 

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<any> = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {<div><button >Save</button></div>}
      {(error)
        ? <div className={styles.formSummaryError}>{error} </div>
        : null}
      <div>
        <b>My full name:</b>{createField<ProfileTypeKeys>('full name', 'fullName', Input, [])}
      </div>
      <div>
        Рабочий статус: {createField<ProfileTypeKeys>('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
      </div>
      <div>
        <b>My professional skils:</b>{createField<ProfileTypeKeys>('professional skils', 'lookingForAJobDescription', Textarea, [])}
      </div>
      <div>
        <b>About me: </b> {createField<ProfileTypeKeys>('about me', 'aboutMe', Textarea, [],)}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map(key => {
          return <div key={key}><b>{key}: {createField(key, `contacts.${key}`, Input, [],)} </b></div>
        })}
      </div>
      
      
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm<any, any>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
