import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
  };

  return (
    <div>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <ImageGallery inputValue={inputValue} />
    </div>
  );
};

export default App;
