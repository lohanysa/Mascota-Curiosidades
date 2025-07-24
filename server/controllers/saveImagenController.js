// controllers/savedImageController.js
const {SavedImage} = require('../models/saveImgModel');
const axios = require('axios')

createImage = async (req, res) => {
  try {
    conole.log('Guardando imagen:', req.body)
    const { imageUrl, breed, type } = req.body;

    const newImage = new SavedImage({ imageUrl, breed, type })
    await newImage.save();

    res.status(201).json({ message: 'Imagen guardada con éxito', image: newImage })
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la imagen' })
  }
}

deleteImage = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await SavedImage.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Imagen no encontrada' })
    }

    res.json({ message: 'Imagen eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' })
  }
}

getAllImages = async (req, res) => {
  try {
    const images = await SavedImage.find();

    if (!images || images.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes guardadas' });
    }

    res.json(images);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes', errorMensaje: error.message });
  }
}


module.exports = { 
  createImage, 
  deleteImage, 
  getAllImages 
}