import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import style from './../Dialogs.module.css';

type DialogItemType = {   
  name: string
  id: number
}

const DialogItem: React.FC<DialogItemType> = (props) => {
  let path = '/dialogs/' + props.id;

  const className = useLocation().pathname === path ? style.active : style.dialog;

  return (
    <div className={className}>
      <NavLink
        to={path}
      >
        {props.name}
      </NavLink>
    </div>
  )
}

export default DialogItem;
