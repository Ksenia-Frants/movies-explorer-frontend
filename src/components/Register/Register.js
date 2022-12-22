import { React } from 'react';
import './Register.css';
import Input from '../Input/Input';
import Form from '../Form/Form';
import FormLink from '../FormLink/FormLink';

function Register() {
  return (
    <section className='register'>
      <div className='register__container'>
        <Form title='Добро пожаловать!'>
          <Input spanText='Имя' name='name' type='text' defaultValue='Ксения' />

          <Input spanText='E-mail' name='email' type='email' defaultValue='pochta@yandex.ru' />

          <Input spanText='Пароль' name='password' type='password' defaultValue='••••••••••••••' />

          <span className='register__error'>Что-то пошло не так...</span>
          <button type='submit' className='register__button'>
            Зарегистрироваться
          </button>
        </Form>
        <FormLink text='Уже зарегистрированы?' page='/signin' link='Войти' />
      </div>
    </section>
  );
}

export default Register;
