import React from 'react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/navbar';
const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home-page">
      <h1 className="text-center my-4">Buscador de Razas de Mascotas</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* me gustaria poner un scrip que se ejecuta cada 10 segundos y trae info de geminis, como datos curiosos etc.*/}
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2>¿Cómo funciona?</h2>
            <p>Busca razas específicas o descubre imágenes aleatorias de perros y gatos.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;


