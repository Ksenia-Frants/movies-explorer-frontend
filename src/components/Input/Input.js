import React from 'react';
import './Input.css';

function Input({ spanText, name, type, defaultValue }) {
  return (
    <label className='form__label'>
      <span className='form__span'>{spanText}</span>
      <input
        className='form__input'
        name={name}
        type={type}
        defaultValue={defaultValue}
        required></input>
    </label>
  );
}

export default Input;
