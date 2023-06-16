import React from "react";
import styles from './FormsControls.module.css';
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlParamsType = {
  meta: { 
    error: string 
    touched: boolean 
  }
  children: React.ReactNode
}

const FormControl: React.FC<FormControlParamsType> = ({ meta: { error, touched }, children }) => {
  const hasError = error && touched;

  return (
    <div 
      className={styles.formControl + ' ' + (hasError ? styles.error : ' ')}
    >
      <div>
        {children}
      </div>
      {hasError ? <span> {error}</span> : null}
    </div >
  )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, child, ...restProps } = props
  return <FormControl {...props}><textarea {...input} {...restProps} /> </FormControl>

}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

export function createField<FormKeysType> (
  placeholder: string | undefined, 
  name: FormKeysType, 
  component: React.FC<WrappedFieldProps>, 
  validators: Array<FieldValidatorType>,  
  props = {}, 
  text: string = '' 
  ) {
  return <div>
    <Field 
      placeholder={placeholder} 
      name={name} 
      component={component}
      validate={validators} 
      {...props} 
    /> 
      {text}
  </div>
  }

export type GetStringKeys<T> = Extract<keyof T, string>
