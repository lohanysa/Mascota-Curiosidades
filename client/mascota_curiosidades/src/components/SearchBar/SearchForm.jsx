import React from 'react';

const SearchForm = ({
  searchTerm,
  searchType,
  handleSearchChange,
  handleTypeChange,
  handleSubmit,
  getRandomImage
}) => {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={`Buscar raza de ${searchType === 'dog' ? 'perro' : 'gato'}...`}
      />
      <select
        className="search-select"
        value={searchType}
        onChange={handleTypeChange}
      >
        <option value="dog">Perro</option>
        <option value="cat">Gato</option>
      </select>
      <button type="submit" className="search-button" disabled={!searchTerm.trim()}>
        🔍
      </button>
      <button
        type="button"
        className="random-button"
        onClick={getRandomImage}
      >
        🎁 Aleatorio
      </button>
    </form>
  );
};

export default SearchForm;