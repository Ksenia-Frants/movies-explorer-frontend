import { React } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import FormLink from '../FormLink/FormLink';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register() {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  return (
    <section className='register'>
      <div className='register__container'>
        <form className='register__form'>
          <Logo />
          <h1 className='register__title'>Добро пожаловать!</h1>
          <label className='register__label'>
            <span className='register__input-name'>Имя</span>
            <input
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              className='register__input'
              name='name'
              type='text'
              placeholder='Имя'
              required
              values={values.name || ''}
              onChange={handleChange}></input>
            <span className='register__error'>{errors.name || ''}</span>
          </label>
          <label className='register__label'>
            <span className='register__input-name'>E-mail</span>
            <input
              className='register__input'
              name='email'
              type='email'
              placeholder='Почта'
              required
              value={values.email || ''}
              onChange={handleChange}></input>
            <span className='register__error'>{errors.email || ''}</span>
          </label>
          <label className='register__label'>
            <span className='register__input-name'>Пароль</span>
            <input
              className='register__input'
              name='password'
              type='password'
              placeholder='Пароль'
              required
              value={values.password || ''}
              onChange={handleChange}></input>
            <span className='register__error'>{errors.password || ''}</span>
          </label>
          <button type='submit' className='register__button' disabled={!isValid}>
            Зарегистрироваться
          </button>
        </form>
        <FormLink text='Уже зарегистрированы?' page='/signin' link='Войти' />
      </div>
    </section>
  );
}

export default Register;
