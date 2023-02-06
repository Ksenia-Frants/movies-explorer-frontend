import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }
  return (
    <section className='not-found'>
      <span className='not-found__status'>404</span>
      <span className='not-found__name'>Страница не найдена</span>

      <Link to='/' className='not-found__link' onClick={handleGoBack}>
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
