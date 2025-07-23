import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="text-center my-4">Buscador de Razas de Mascotas</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Puedes agregar más contenido aquí debajo del SearchBar */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2>¿Cómo funciona?</h2>
            <p>Busca razas específicas o descubre imágenes aleatorias de perros y gatos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


