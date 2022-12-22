import React from 'react';
import './AboutProject.css';
import SecondTitle from '../SecondTitle/SecondTitle';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <SecondTitle name='О проекте' />
      <ul className='about-project__list'>
        <li className='about-project__item'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </li>
        <li className='about-project__item'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__time-scheme'>
        <span className='about-project__week about-project__week_backend'>1 неделя</span>
        <span className='about-project__week about-project__week_frotend'>4 недели</span>
      </div>
    </section>
  );
}

export default AboutProject;
