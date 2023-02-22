import { React, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ handleSignOut, handleEditProfile, user, errorMessage }) {
  const { values, handleChange, isValid, resetForm, setValues, errors } = useFormWithValidation();
  const [disabled, setDisabled] = useState(true);
  const [noNameChanges, setNoNameChanges] = useState(true);
  const [noEmailChanges, setNoEmailChanges] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

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
    handleEditProfile(values, setIsNotifyVisible);

    setDisabled(true);
  }

  function checkNameChange(evt) {
    handleChange(evt);
    currentUser.name === evt.target.value ? setNoNameChanges(true) : setNoNameChanges(false);
  }

  function checkEmailChange(evt) {
    handleChange(evt);
    currentUser.email === evt.target.value ? setNoEmailChanges(true) : setNoEmailChanges(false);
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
            defaultValue={values.name || ''}
            onChange={checkNameChange}></input>
          <span className='profile__input-error'>{errors.name || ''}</span>
        </fieldset>

        <fieldset className='profile__fieldset profile__fieldset_type_email'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            name='email'
            id='email'
            disabled={disabled ? true : false}
            required
            placeholder='Почта'
            defaultValue={values.email || ''}
            onChange={checkEmailChange}></input>
          <span className='profile__input-error'>{errors.email || ''}</span>
        </fieldset>

        <span className={`profile__notify ${isNotifyVisible ? 'profile__notify_visible' : ''}`}>
          Данные успешно обновлены
        </span>
        <span
          className={
            errorMessage.message ? 'profile__error profile__error_visible' : 'profile__error'
          }>
          {errorMessage.message}
        </span>
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
            disabled={!isValid || (noNameChanges && noEmailChanges)}
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
