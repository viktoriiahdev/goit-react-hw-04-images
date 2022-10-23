import GalleryItem from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ src, alt, large }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalToggle = () => setIsModalOpen(state => !state);
  return (
    <>
      <GalleryItem className="ImageGalleryItem" onClick={onModalToggle}>
        <img src={src} alt={alt} className="ImageGalleryItem-image" />
      </GalleryItem>
      {isModalOpen && <Modal img={large} alt="" onClose={onModalToggle} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
