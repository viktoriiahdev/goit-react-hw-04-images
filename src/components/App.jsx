import { StrictMode, useState, useEffect } from 'react';

import { fetchImages } from 'services/fetchImages';

import Section from './Section/Section.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { useRef } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  const showLoadMore = useRef(false);

  const perPage = 12;

  useEffect(() => {
    if (!query) return;

    setStatus('pending');
    fetchImages(query, page, perPage)
      .then(json => {
        if (!json.total) throw new Error();
        showLoadMore.current = json.total > page * perPage;
        setImages(prev => [...prev, ...json.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        showLoadMore.current = false;
        setImages([]);
        setStatus('rejected');
      });
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const searchImages = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  if (status === 'idle') {
    return (
      <StrictMode>
        <Section>
          <Searchbar onSubmit={searchImages} />
        </Section>
      </StrictMode>
    );
  }

  if (status === 'pending') {
    return (
      <StrictMode>
        <Section>
          <Searchbar onSubmit={searchImages} />
          {images && <ImageGallery images={images} />}
          {showLoadMore.current && <Button onClick={loadMore} disabled={true} />}
          <Loader />
        </Section>
      </StrictMode>
    );
  }

  if (status === 'resolved') {
    return (
      <StrictMode>
        <Section>
          <Searchbar onSubmit={searchImages} />
          {images && <ImageGallery images={images} />}
          {showLoadMore.current && <Button onClick={loadMore} disabled={false} />}
        </Section>
      </StrictMode>
    );
  }

  if (status === 'rejected') {
    return (
      <StrictMode>
        <Section>
          <Searchbar onSubmit={searchImages} />
          <h2 style={{ textAlign: 'center' }}>Images not found!</h2>
        </Section>
      </StrictMode>
    );
  }
};

export default App;
