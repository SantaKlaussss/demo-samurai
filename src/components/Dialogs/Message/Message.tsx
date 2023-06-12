import React from 'react';
import style from './../Dialogs.module.css';

type MessagePropsType = {
  key: number
  message: string
  id: number
}

const Message: React.FC<MessagePropsType> = (props) => {
  return <div className={style.message}> {props.message} </div>
}

export default Message;
