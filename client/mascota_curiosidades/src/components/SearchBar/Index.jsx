import React, { useState } from 'react'
import '../../style/SearchBar.css'
import SearchForm from './SearchForm'
import PetCard from './PetCard'
import { searchByBreed, getRandomImage } from './Api'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('dog')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveMessage, setSaveMessage] = useState(null)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value)
    setResults([]);
  };

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setSaveMessage(null)

    try {
      const data = await searchByBreed(searchType, searchTerm);
      setResults([data])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  const handleRandomImage = async () => {
    setLoading(true)
    setError(null)
    setSaveMessage(null)
    setSearchTerm('')

    try {
      const data = await getRandomImage(searchType);
      setResults([data])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    if (searchTerm.trim()) {
      handleSearch();
    }
  };

  const handleSaveResult = (message, isError = false) => {
    setSaveMessage({ text: message, isError });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="container-fluid">
      <div className="search-container">
        <SearchForm
          searchTerm={searchTerm}
          searchType={searchType}
          handleSearchChange={handleSearchChange}
          handleTypeChange={handleTypeChange}
          handleSubmit={handleSubmit}
          getRandomImage={handleRandomImage}
        />

        {loading && <div className="text-center mt-3">Cargando...</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {saveMessage && (
          <div className={`alert mt-3 ${saveMessage.isError ? 'alert-danger' : 'alert-success'}`}>
            {saveMessage.text}
          </div>
        )}

        <div className="row mt-4">
          {results.map((result, index) => (
            <PetCard
              key={index}
              result={result}
              searchType={searchType}
              onSave={handleSaveResult}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;