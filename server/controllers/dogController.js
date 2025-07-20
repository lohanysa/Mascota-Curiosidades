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

//se supone que esto es una busqueda inteligente 
//si el usuario escribe "me gusta los husky" entonces busca husky
/*exports.searchDogByKeyword = async (req, res) => {
  const keyword = req.query.q.toLowerCase();
  const razaEncontrada = Object.keys(razasDisponibles).find(raza =>
    keyword.includes(raza)
  );

  if (razaEncontrada) {
    return exports.getDogByBreed({ params: { breed: razaEncontrada } }, res);
  } else {
    return res.status(404).json({ error: 'No se encontró una raza asociada a esa palabra' });
  }
};*/

//esto es para obtener datos curiosos de los perros 
/*exports.getDogFacts = (req, res) => {
  const randomFact = datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)];
  res.json({ fact: randomFact });
};*/

module.exports = {
  getRandomDogImage,    
    getDogByBreed}