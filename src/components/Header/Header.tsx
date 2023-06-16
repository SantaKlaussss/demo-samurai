import React from 'react';
import style from './Header.module.css'
import { NavLink } from 'react-router-dom';

export type MapHeaderType = {
  isAuth: boolean
  login: string
}

export type DispatchHeaderType = {
  logout: () => void
}

const Header: React.FC<MapHeaderType & DispatchHeaderType> = (props) => {
  return(
    <header className={style.header}>
        <img 
          src="https://main-cdn.sbermegamarket.ru/big2/hlr-system/750/548/568/391/449/100049078777b0.jpg"
          alt=''
        />
        <div className={style.loginBlock}>
          {props.isAuth 
          ? <div> 
              {props.login} 
              <div>
                <button 
                  onClick={props.logout}
                  type='button'
                >
                  Log out 
                </button>
              </div>
            </div>
          : <NavLink to={'/login'}>Login</NavLink>
          }
        </div>
      </header>
  )
}

export default Header;
