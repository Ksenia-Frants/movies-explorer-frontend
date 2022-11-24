import { React } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label'>
        <input className='filter-checkbox__input' type='checkbox'></input>
        <span className='filter-checkbox__name'></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
