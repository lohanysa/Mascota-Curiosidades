// controllers/savedImageController.js
const SavedImage = require('../models/saveImgModel')
const RegistrarUser = require('../models/userModel');
const axios = require('axios')

createImage = async (req, res) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token no proporcionado" })
    }
    const token = authHeader.split(' ')[1]


    const jwt = require('jsonwebtoken')
    const decoded = jwt.verify(token, process.env.localkey)



    const usuario = await RegistrarUser.findOne({ username: decoded.usuario })
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const { imageUrl, breed, type } = req.body


    const newImage = new SavedImage({ imageUrl, breed, type, UserId: usuario._id })
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
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token no proporcionado" })
    }
    const token = authHeader.split(' ')[1]


    const jwt = require('jsonwebtoken')
    const decoded = jwt.verify(token, process.env.localkey)


    const usuario = await RegistrarUser.findOne({ username: decoded.usuario })
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const images = await SavedImage.find({ UserId: usuario._id })

    if (!images || images.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes guardadas para este usuario' })
    }

    res.json(images)

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes', errorMensaje: error.message })
  }
}


module.exports = { 
  createImage, 
  deleteImage, 
  getAllImages 
}