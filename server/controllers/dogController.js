const axios = require('axios');

//obtener una imagen random
getRandomDogImage = async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    res.json({ imageUrl: response.data.message });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener imagen aleatoria' });
  }
};

//busca el perro por la raza
getDogByBreed = async (req, res) => {
  const breed = req.params.breed.toLowerCase();
  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    res.json({ imageUrl: response.data.message });
  } catch (error) {
    res.status(500).json({ error: 'No se encontró la raza' });
  }
};


module.exports = {
  getRandomDogImage,    
    getDogByBreed}