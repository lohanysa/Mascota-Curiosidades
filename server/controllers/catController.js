const axios = require('axios');
require('dotenv').config()
const getRandomCat = async (req, res) => {
  const CAT_API_URL = process.env.CAT_API_URL 
  const CAT_API_KEY = process.env.CAT_API_KEY

  try {
    const response = await axios.get(`${CAT_API_URL}images/search`, {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    });

    const cat = response.data[0];
    const breedData = cat.breeds && cat.breeds[0];


    res.json({
      image: cat.url,
      id: cat.id,
      name: breedData?.name || 'Desconocido',
      description: breedData?.description || 'No disponible',
      temperament: breedData?.temperament || 'No disponible',
      origin: breedData?.origin || 'No disponible'
    });

  } catch (error) {

    res.status(500).json({ error: 'Error al obtener imagen aleatoria' });
  }
};


const searchCatByBreed = async (req, res) => {
  const { breed } = req.params;
  const CAT_API_KEY = process.env.CAT_API_KEY;
  const CAT_API_URL = process.env.CAT_API_URL;

  try {

    if (!breed) {
      return res.status(400).json({ error: 'Parámetro "breed" es requerido' });
    }

    if (!CAT_API_KEY || !CAT_API_URL) {
      return res.status(500).json({ error: 'Faltan variables de entorno CAT_API_KEY o CAT_API_URL' });
    }

  
    const breedListResponse = await axios.get(`${CAT_API_URL}breeds`, {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    });

    // Buscar la raza por nombre o ID
    const breedData = breedListResponse.data.find(b =>
      b.name.toLowerCase() === breed.toLowerCase() ||
      b.id.toLowerCase() === breed.toLowerCase()
    );

    if (!breedData) {
      return res.status(404).json({ error: 'Raza no encontrada' });
    }

    // Obtener imagen de la raza
    const imageResponse = await axios.get(`${CAT_API_URL}images/search`, {
      headers: {
        'x-api-key': CAT_API_KEY
      },
      params: {
        breed_ids: breedData.id
      }
    });

    const image = imageResponse.data[0];

    res.json({
      breed: breedData.name,
      description: breedData.description,
      temperament: breedData.temperament,
      origin: breedData.origin,
      image: image?.url || null
    });
  } catch (error) {
    console.error('Error al buscar por raza:', error.message);
    res.status(500).json({ error: 'Error al buscar por raza' });
  }
};



module.exports = {
  getRandomCat,
  searchCatByBreed
};
