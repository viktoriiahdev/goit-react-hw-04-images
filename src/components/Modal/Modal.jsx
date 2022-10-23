import { useEffect } from 'react';
import PropTypes from 'prop-types';

import GalleryModal from './Modal.styled';

const Modal = ({ img, alt, onClose }) => {
  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) onClose();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <GalleryModal className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={img} alt={alt} />
      </div>
    </GalleryModal>
  );
};

export default Modal;

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
