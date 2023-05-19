import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { Report } from 'notiflix/build/notiflix-report-aio';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInput = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue === '') {
      Report.info('Enter a search query!', '', 'Ok');
    }
    this.props.onFormSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <label className="SearchForm-button-label" htmlFor="id-1"></label>
          <input
            onChange={this.handleInput}
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
  }
}

export default Searchbar;
