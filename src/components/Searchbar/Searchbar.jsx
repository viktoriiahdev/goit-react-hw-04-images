import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Searchbar.styled';
import Form from './SearchForm.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    resetForm();
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <Header className="Searchbar">
      <Form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
