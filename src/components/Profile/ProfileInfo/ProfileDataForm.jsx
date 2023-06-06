import React from "react";
import { Input, Textarea, createField } from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import styles from '../../common/FormsControls/FormsControls.module.css';

let ProfileDataForm = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {<div><button >Save</button></div>}
      {(error)
        ? <div className={styles.formSummaryError}>{error} </div>
        : null}
      <div>
        <b>My full name:</b>{createField('full name', 'FullName', Input, [])}
      </div>
      <div>
        Рабочий статус: {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
      </div>
      <div>
        <b>My professional skils:</b>{createField('professional skils', 'lookingForAJobDescription', Textarea, [])}
      </div>
      <div>
        <b>About me: </b> {createField('about me', 'aboutMe', Textarea, [],)}
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

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
