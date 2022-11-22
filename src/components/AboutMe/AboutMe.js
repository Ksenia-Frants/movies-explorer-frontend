import React from 'react';
import './AboutMe.css';
import avatar from '../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__container'>
          <h3 className='about-me__name'>Ксения</h3>
          <p className='about-me__job'>Фронтенд-разработчица, 25 лет</p>
          <p className='about-me__description'>
            Живу в Красноярске, закончила ЛГУ им. А.С. Пушкина, на факультете Естествознания,
            Географии и Туризма. Давно тянуло в сферу IT, для себя выбрала веб-разработку и хочу
            преуспеть в этом. Люблю отдых на природе, музыку, занимаюсь йогой и воспитываю бигля.
          </p>
          <ul className='about-me__list'>
            <li className='about-me__item'>
              <a
                className='about-me__link'
                href='https://t.me/denpersimmon'
                target='_blank'
                rel='noreferrer'>
                Telegram
              </a>
            </li>
            <li className='about-me__item'>
              <a
                className='about-me__link'
                href='https://github.com/Ksenia-Frants'
                target='_blank'
                rel='noreferrer'>
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className='about-me__avatar' src={avatar} alt='Фотография студента.' />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
