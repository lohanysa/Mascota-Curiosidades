// controllers/savedImageController.js
const SavedImage = require('../models/SavedImage');
const axios = require('axios');

exports.createImage = async (req, res) => {
  try {
    const { imageUrl, breed, type } = req.body;

    const newImage = new SavedImage({ imageUrl, breed, type });
    await newImage.save();

    res.status(201).json({ message: 'Imagen guardada con éxito', image: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la imagen' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SavedImage.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json({ message: 'Imagen eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};
