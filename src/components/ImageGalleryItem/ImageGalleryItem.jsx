import React, { Component } from 'react';
import Modal from '../Modal/Modal';

import Loader from '../Loader/Loader';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    isLoading: false,
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { showModal, isLoading } = this.state;
    return (
      <>
        <li className="ImageGalleryItem">
          <img
            onClick={this.handleOpenModal}
            className="ImageGalleryItem-image"
            src={this.props.webformat}
            alt="tags"
            loading="lazy"
            onLoad={this.handleImageLoad}
          />
        </li>
        {showModal && (
          <Modal
            src={this.props.largeImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

export default ImageGalleryItem;
