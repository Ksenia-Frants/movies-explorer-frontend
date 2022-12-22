import { React } from 'react';
import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form';
import FormLink from '../FormLink/FormLink';

function Login() {
  return (
    <section className='login'>
      <div className='login__container'>
        <Form title='Рады видеть!'>
          <Input spanText='E-mail' name='email' type='email' defaultValue='pochta@yandex.ru' />

          <Input spanText='Пароль' name='password' type='password' />

          <button type='submit' className='login__button'>
            Войти
          </button>
        </Form>
        <FormLink text='Ещё не зарегистрированы?' page='/signup' link='Регистрация' />
        {/* <div className='login__signup-container'>
          <span className='login__text'>Ещё не зарегистрированы?</span>
          <Link to='/signup' className='login__signup'>
            Регистрация
          </Link>
        </div> */}
      </div>
    </section>
  );
}

export default Login;
