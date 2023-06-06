import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Input, createField } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { login } from "../../redux/auth-reducer.ts";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css';

const maxLength5 = maxLengthCreator(20)

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit} >
      {createField("email", 'email', Input, [required, maxLength5])}
      {createField("password", 'password', Input, [required, maxLength5], { type: 'password' })}
      {createField(null, 'rememberMe', Input, null, { type: 'checkbox', checked: true }, 'remember me')}

      {captchaUrl && <img src="captchaUrl" />}
      {captchaUrl && createField('Enter symbols from image', 'captcha', Input, [required], {})}

      {(error)
        ? <div className={styles.formSummaryError}>{error} </div>
        : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)


const Login = ({ login, isAuth, captcha }) => {

  const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
  captcha: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
