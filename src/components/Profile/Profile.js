import { React, useState } from 'react';
import './Profile.css';

function Profile() {
  const [disabled, setDisabled] = useState(true);

  function handleChange(evt) {
    evt.preventDefault();
    setDisabled(false);
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Ксения!</h1>
      <form className='profile__form'>
        <fieldset className='profile__fieldset profile__fieldset_type_name'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input
            className='profile__input'
            defaultValue='Ксения'
            type='text'
            name='name'
            id='name'
            disabled={disabled ? true : false}
            required></input>
        </fieldset>
        <fieldset className='profile__fieldset profile__fieldset_type_email'>
          <label className='profile__label' for='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            defaultValue='pochta@yandex.ru'
            type='email'
            name='email'
            id='email'
            disabled={disabled ? true : false}
            required></input>
        </fieldset>
        <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
        {disabled ? (
          <button
            className='profile__button profile__button_type_edit'
            type='submit'
            onClick={handleChange}>
            Редактировать
          </button>
        ) : (
          <button className='profile__button profile__button_type_save'>Сохранить</button>
        )}
      </form>
      {disabled ? (
        <button className='profile__button profile__button_type_out'>Выйти из аккаунта</button>
      ) : (
        ''
      )}
    </section>
  );
}

export default Profile;
