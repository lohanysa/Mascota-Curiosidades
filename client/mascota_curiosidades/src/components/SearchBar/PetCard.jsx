import React from 'react'
import { saveImage } from './Api'

const PetCard = ({ result, searchType, onSave }) => {
  const handleSave = async () => {
    try {
      const imageData = {
        imageUrl: result.imageUrl || result.image,
        breed: result.breed || (searchType === 'dog' ? 'Perro aleatorio' : 'Gato aleatorio'),
        type: searchType
      };
      
      await saveImage(imageData);
      onSave('¡Imagen guardada con éxito!')
    } catch (error) {
      onSave(error.message, true)
    }
  };

  return (
    <div className="col-md-4 mb-4">
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
          
          {(result.imageUrl || result.image) && (
            <button 
              className="btn btn-primary mt-2"
              onClick={handleSave}
            >
              💾 Guardar Imagen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;