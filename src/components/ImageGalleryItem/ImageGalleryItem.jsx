import React, { useState } from 'react';
import Modal from '../Modal/Modal';

import Loader from '../Loader/Loader';

const ImageGalleryItem = ({ webformat, largeImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          onClick={handleOpenModal}
          className="ImageGalleryItem-image"
          src={webformat}
          alt="tags"
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </li>
      {showModal && <Modal src={largeImage} onCloseModal={handleCloseModal} />}
      {isLoading && <Loader />}
    </>
  );
};

export default ImageGalleryItem;
