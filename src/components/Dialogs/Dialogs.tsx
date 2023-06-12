import React from 'react';
import DialogItem from './DialogItem/DialogItem.tsx';
import style from './Dialogs.module.css';
import Message from './Message/Message.tsx';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {Textarea} from '../common/FormsControls/FormsControls.tsx';
import { maxLengthCreator, required } from '../../utils/validators/validators.ts';
import { DialogType, MessageType } from '../../types/types.ts';

type DialogsComponentPropsType = {
  dialogsPage: {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
  }
  sendMessage: (values: string) => void
  isAuth: boolean
}

const Dialogs: React.FC<DialogsComponentPropsType> = (props) => {
  let AddNewMessage = (values: any) => {
    props.sendMessage(values.newMessageBody);
  }

  let dialogsElements = props.dialogsPage.dialogs.map(item => 
    <DialogItem 
      key={item.id} 
      name={item.name} 
      id={item.id} 
    />)

  let messagesElements = props.dialogsPage.messages.map(item => 
  <Message 
    key={item.id} 
    message={item.message} 
    id={item.id} 
  />)

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

type AddMessageFormType = {
  handleSubmit: () => void
}

const AddMessageForm = (props: AddMessageFormType) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name='newMessageBody' component={Textarea} placeholder='Сообщение...'
        validate={[required, maxlength10]}/>
      <div>
        <button type='button'>Send</button>
      </div>
    </form>

  )
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
