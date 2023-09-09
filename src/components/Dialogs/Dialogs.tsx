import React from 'react';
import DialogItem from './DialogItem/DialogItem.tsx';
import style from './Dialogs.module.css';
import Message from './Message/Message.tsx';
import {  InjectedFormProps, reduxForm } from 'redux-form';
import {Textarea, createField} from '../common/FormsControls/FormsControls.tsx';
import { maxLengthCreator, required } from '../../utils/validators/validators.ts';
import { InitialStateDialogsType } from '../../redux/dialogs-reducer.ts';

type OwnPropsType = {
  dialogsPage: InitialStateDialogsType
  sendMessage: (messageText: string) => void
}

type NewMessageFormType = {
  newMessageBody: string
}

type LoginFormPropertiesType = Extract<keyof NewMessageFormType, string>

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let AddNewMessage = (values: { newMessageBody: string }) => {
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
  />)

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

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType & PropsType>> = (props) => {
  return (
    <form onClick={props.handleSubmit}>
      {createField<NewMessageFormValuesKeysType>("Сообщение...", 'newMessageBody', Textarea, [required, maxlength10])}
      <div>
        <button type='button'>Send</button>
      </div>
    </form>

  )
}

const AddMessageReduxForm = reduxForm<NewMessageFormType>({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
