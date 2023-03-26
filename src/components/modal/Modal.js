
import React, { useEffect } from 'react';
import './Modal-module.css';
import PropTypes from 'prop-types';

export default function Modal({ largeImageURL, closeModal}) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [ closeModal ]);

  const handleCloseModal = event => {
    if (event && event.target && event.target === event.currentTarget) {
      closeModal();
    }
  };

  

  return (
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
    
  );
}

Modal.prototype = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
