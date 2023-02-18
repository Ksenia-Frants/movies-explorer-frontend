import React from 'react';
import './FormLink.css';
import { Link } from 'react-router-dom';

function FormLink({ text, page, link }) {
  return (
    <div className='form-link__container'>
      <span className='form-link__text'>{text}</span>
      <Link to={page} className='form-link__link'>
        {link}
      </Link>
    </div>
  );
}

export default FormLink;
