import React, { useState } from 'react';
import '../style/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('dog');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
    setResults([]);
  };

  const searchByBreed = async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';
      if (searchType === 'dog') {
        endpoint = `http://localhost:4040/api/dogs/breed/${searchTerm}`;
      } else {
        endpoint = `http://localhost:4040/api/cats/breed/${searchTerm}`;
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('No se encontraron resultados');
      }

      const data = await response.json();
      setResults([data]); // Mostrar como array 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomImage = async () => {
    setLoading(true);
    setError(null);
    setSearchTerm(''); // Limpiar el término 

    try {
      let endpoint = '';
      if (searchType === 'dog') {
        endpoint = 'http://localhost:4040/api/dogs/random';
      } else {
        endpoint = 'http://localhost:4040/api/cats/random';
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener imagen aleatoria');
      }

      const data = await response.json();
      setResults([data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      searchByBreed();
    }
  };

  return (
    <div class="container fluid">


      <div className="search-container">
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

        {loading && <div className="text-center mt-3">Cargando...</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="row mt-4">
          {results.map((result, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                {result.imageUrl || result.image ? (
                  <img
                    src={result.imageUrl || result.image}
                    className="card-img-top"
                    alt={result.breed || 'Imagen aleatoria'}
                  />
                ) : null}
                <div className="card-body">
                  <h5 className="card-title">
                    {result.breed || (searchType === 'dog' ? 'Perro aleatorio' : 'Gato aleatorio')}
                  </h5>
                  {result.description && (
                    <p className="card-text">{result.description}</p>
                  )}
                  {result.temperament && (
                    <div className="mb-2">
                      <strong>Temperamento:</strong> {result.temperament}
                    </div>
                  )}
                  {result.origin && (
                    <div>
                      <strong>Origen:</strong> {result.origin}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
