import { React, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ handleSignOut, handleEditProfile, user }) {
  const { values, handleChange, isValid, resetForm, setValues } = useFormWithValidation();
  const [disabled, setDisabled] = useState(true);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [resetForm, currentUser, setValues]);

  function handleRelate(evt) {
    evt.preventDefault();
    setDisabled(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleEditProfile(values);
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {user.name}!</h1>
      <form className='profile__form'>
        <fieldset className='profile__fieldset profile__fieldset_type_name'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='profile__input'
            type='text'
            name='name'
            id='name'
            disabled={disabled ? true : false}
            required
            placeholder='Имя'
            values={values.name || ''}
            onChange={handleChange}></input>
        </fieldset>
        <fieldset className='profile__fieldset profile__fieldset_type_email'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
            className='profile__input'
            type='email'
            name='email'
            id='email'
            disabled={disabled ? true : false}
            required
            placeholder='Почта'
            values={values.email || ''}></input>
        </fieldset>
        <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
        {disabled ? (
          <button
            className='profile__button profile__button_type_edit'
            type='submit'
            onClick={handleRelate}>
            Редактировать
          </button>
        ) : (
          <button
            className='profile__button profile__button_type_save'
            disabled={!isValid}
            onClick={handleSubmit}>
            Сохранить
          </button>
        )}
      </form>
      {disabled ? (
        <Link
          to='/'
          className='profile__button profile__button_type_out'
          onClick={() => {
            handleSignOut();
          }}>
          Выйти из аккаунта
        </Link>
      ) : (
        ''
      )}
    </section>
  );
}

export default Profile;
