import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Gallery from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <Gallery className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem key={id} src={webformatURL} alt={tags} large={largeImageURL} />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired
  ),
};
