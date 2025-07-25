import { useEffect, useState } from 'react';

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
        })

        if (!response.ok) {
          throw new Error('Error al obtener las imágenes');
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    allImages()
  }, []);


return (
    <div className="row">
      {images.map((img) => (
        <div key={img._id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={img.imageUrl}
              alt={img.breed}
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{img.breed}</h5>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(img._id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default API_AllImages;

