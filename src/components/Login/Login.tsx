import React from "react";
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input, createField } from "../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../../utils/validators/validators.ts";
import { login } from "../../redux/auth-reducer.ts";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../redux/redux-store.js';

const maxLength5 = maxLengthCreator(20)

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType> & LoginFormValuesType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit} >
      {createField<LoginFormPropertiesType>
        ("email", 'email', Input, [required, maxLength5])}
      {createField<LoginFormPropertiesType>
        ("password", 'password', Input, [required, maxLength5], { type: 'password' })}
      {createField<LoginFormPropertiesType>
        (undefined, 'rememberMe', Input, [], { type: 'checkbox', checked: true }, 'remember me')}

      {captchaUrl && <img alt="" src="captchaUrl" />}
      {captchaUrl && createField<LoginFormPropertiesType>
      ('Enter symbols from image', 'captcha', Input, [required], {})}

      {(error)
        ? <div className={styles.formSummaryError}>{error} </div>
        : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

type MapStateToPropsType = {
  captcha: string | null
  isAuth: boolean
}

type MapDispatchToPropsType = {
  login: (email: string, password: number, rememberMe: boolean, captcha: string) => void
}


export type LoginFormValuesType = {
  password: string
  email: string
  rememberMe: boolean
  captcha: string
}

type LoginFormPropertiesType = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ login, isAuth, captcha }) => {

  const onSubmit = (formData: any) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (isAuth) {
    return <Navigate to={'/profile'} />
  }
  return <div>
    <h1>LOGIN</h1>
    <h2>dsfdsfvdsvf@mail.ru</h2>
    <h2>FdSa12sa34</h2>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captcha} />
  </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  captcha: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
