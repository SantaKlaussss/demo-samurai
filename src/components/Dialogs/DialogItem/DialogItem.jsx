import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import style from './../Dialogs.module.css';

function DialogItem(props) {
  let path = '/dialogs/' + props.id;

  const className = useLocation().pathname === path ? style.active : style.dialog;

  return (
    <div className={className}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem;