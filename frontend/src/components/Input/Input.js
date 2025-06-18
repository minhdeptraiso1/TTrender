import React from 'react'
import classes from './input.module.css'
import InputContainer from '../InputContainer/InputContainer'
function Input(
    {
        label,
        defaultValue,
        type,
        onChange,
        onBlur,
        name,
        error, 
    },
    ref
) {
    const getErrorMessage = () => {
        if(!error) return null;
        if(error.message) return error.message;
        switch(error.type){
            case 'required':
                return 'Trường này là bắt buộc';
            case 'minLength':
                return `Trường này phải có ít nhất ${error.minLength} ký tự`;
            case 'maxLength':
                return `Trường này phải có nhiều nhất ${error.maxLength} ký tự`;
            case 'pattern':
                return error.pattern;
            default:
                return 'Định dạng không hợp lệ';
        }
    }

  return (
    <InputContainer label={label}>
        <input 
        className={classes.input}
        type={type} 
        defaultValue={defaultValue} 
        onChange={onChange} 
        onBlur={onBlur} 
        name={name} 
        ref={ref}
        placeholder={label}
        />
        {error && <p className={classes.error}>{getErrorMessage()}</p>}
    </InputContainer>
  )
}

export default React.forwardRef(Input);