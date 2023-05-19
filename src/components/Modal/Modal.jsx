import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.props.onCloseModal}>
        <div className="modal">
          <img src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;
