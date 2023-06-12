import React from 'react';
import style from './Header.module.css'
import { NavLink } from 'react-router-dom';

type HeaderType = {
  isAuth: boolean
  login: string
  logout: React.MouseEventHandler<HTMLButtonElement>
}

const Header: React.FC<HeaderType> = (props) => {
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
