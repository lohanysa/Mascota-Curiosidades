const axios = require('axios')
require('dotenv').config()

const CAT_API_URL = process.env.CAT_API_URL
const CAT_API_KEY = process.env.CAT_API_KEY

//Obtener imagen aleatoria de un gato
const getRandomCat = async (req, res) => {
  try {
    const response = await axios.get(`${CAT_API_URL}/images/search`, {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    })

    const cat = response.data[0];
    res.json({
      image: cat.url,
      id: cat.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener imagen aleatoria' })
  }
}

// Buscar gato por raza 
const searchCatByBreed = async (req, res) => {
   const { breed } = req.params;

  try {
    const breedList = await axios.get(`${CAT_API_URL}/breeds`, {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    });

    const breedData = breedList.data.find(b => 
      b.name.toLowerCase() === breed.toLowerCase() ||
      b.id.toLowerCase() === breed.toLowerCase()
    );

    if (!breedData) {
      return res.status(404).json({ error: 'Raza no encontrada' });
    }

    
    
    
    const imageResponse = await axios.get(`${CAT_API_URL}/images/search`, {
      headers: {
        'x-api-key': CAT_API_KEY
      },
      params: {
        breed_id: breedData.id
      }
    });

    const image = imageResponse.data[0]

    res.json({
      breed: breedData.name,
      description: breedData.description,
      temperament: breedData.temperament,
      origin: breedData.origin,
      image: image?.url || null
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por raza' })
  }
}

module.exports = {
  getRandomCat,
  searchCatByBreed
};
