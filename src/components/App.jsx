import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
      </div>
    );
  }
}

export default App;
