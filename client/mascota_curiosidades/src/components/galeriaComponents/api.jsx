import React, { useEffect, useState } from 'react';

const API_AllImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const allImages = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/images/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las imágenes');
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    allImages();
  }, []);

  return (
    <div className="row">
      {images.map((img, index) => (
        <div key={index} className="col-md-4 mb-3">
          <img src={img.url} alt={img.nombre} className="img-fluid" />
        </div>
      ))}
    </div>
  );
};

export default API_AllImages;

