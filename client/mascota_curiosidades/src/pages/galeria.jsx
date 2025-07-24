import React from 'react';
import Navbar from '../components/navbar';
import API_AllImages from '../components/galeriaComponents/api';

const Galeria = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mt-4">Perfil</h1>
            <p className="text-center">Datos personales</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mt-4">Imágenes guardadas</h1>
            <p className="text-center">En esta sección podrás ver tus imágenes favoritas</p>
            <API_AllImages />
          </div>
        </div>
      </div>
    </>
  );
};

export default Galeria;
