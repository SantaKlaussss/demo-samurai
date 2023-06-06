import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {Textarea} from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

function Dialogs(props) {
  let AddNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  }

  let dialogsElements = props.dialogsPage.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesElements = props.dialogsPage.messages.map(item => <Message key={item.id} message={item.message} id={item.id} />)

  if (props.isAuth == false) { return <Navigate to='/login' /> }

  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={style.messages} >
        {messagesElements}
        <AddMessageReduxForm onSubmit={AddNewMessage}/>
      </div>
    </div>
  )
}

const maxlength10 = maxLengthCreator(10)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name='newMessageBody' component={Textarea} placeholder='Сообщение...'
        validate={[required, maxlength10]}/>
      <div>
        <button>Send</button>
      </div>
    </form>

  )
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
