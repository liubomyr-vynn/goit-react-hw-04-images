import React, { useEffect } from 'react';

const Modal = ({ onCloseModal, src }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <div className="overlay" onClick={onCloseModal}>
      <div className="modal">
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default Modal;
