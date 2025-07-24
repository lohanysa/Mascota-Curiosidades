


export const searchByBreed = async (searchType, searchTerm) => {
  let endpoint = '';
  if (searchType === 'dog') {
    endpoint = `http://localhost:4040/api/dogs/breed/${searchTerm}`;
  } else {
    endpoint = `http://localhost:4040/api/cats/search/${searchTerm}`;
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

  return await response.json();
};

export const getRandomImage = async (searchType) => {
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
    throw new Error('Error al obtener imagen aleatoria')
  }

  return await response.json()
};

export const saveImage = async (imageData) => {
  const response = await fetch('http://localhost:4040/api/images/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    },
    body: JSON.stringify(imageData)

  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al guardar la imagen');
  }

  return await response.json();
}

export const deleteImage = async (imageId) => {
  const response = await fetch(`http://localhost:4040/api/images/delete/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // si usas autenticación
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al eliminar la imagen');
  }

  return await response.json();
}
