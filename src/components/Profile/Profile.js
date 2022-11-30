import React from 'react';
import './Profile.css';

function Profile() {
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
            required></input>
        </fieldset>
        <button className='profile__button profile__button_type_edit' type='submit'>
          Редактировать
        </button>
      </form>
      <button className='profile__button profile__button_type_out'>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
