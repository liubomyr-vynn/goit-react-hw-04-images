import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Report } from 'notiflix/build/notiflix-report-aio';

const Searchbar = ({ onFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue === '') {
      Report.info('Enter a search query!', '', 'Ok');
    }
    onFormSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <label className="SearchForm-button-label" htmlFor="id-1"></label>
        <input
          onChange={handleInput}
          value={inputValue}
          type="text"
          placeholder="Search images"
          autoComplete="off"
          autoFocus
          name="search"
          className="SearchForm-input"
          id="id-1"
        />
        <button type="submit" className="SearchForm-button">
          <ImSearch style={{ width: 18, height: 18 }} />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
