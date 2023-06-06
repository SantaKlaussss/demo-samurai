import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';

function Nav(props) {
  return (
    <nav className={style.nav}>
      <div className={style.item}><NavLink to='/profile' className = { navData => navData.isActive ? style.active : style.item }>Profile</NavLink></div>
      <div className={style.item}><NavLink to='/dialogs' className = { navData => navData.isActive ? style.active : style.item }>Messages</NavLink></div>
      <div className={style.item}><NavLink to='/news' className = { navData => navData.isActive ? style.active : style.item }>News</NavLink></div>
      <div className={style.item}><NavLink to='/music' className = { navData => navData.isActive ? style.active : style.item }>Music</NavLink></div>
      <div className={style.item}><NavLink to='/setting' className = { navData => navData.isActive ? style.active : style.item }>Setting</NavLink></div>
      <div className={style.item}><NavLink to='/users' className = { navData => navData.isActive ? style.active : style.item }>Users</NavLink></div>
    </nav>
  )
}

export default Nav;