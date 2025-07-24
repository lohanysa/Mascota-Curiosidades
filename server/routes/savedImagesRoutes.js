const express = require('express');
const routerImg = express.Router();
const {autenticacion } = require('../middleware/autenticacionMiddleware.js')
const { createImage,deleteImage,getAllImages } = require('../controllers/saveImagenController')

routerImg.post('/save', autenticacion, createImage)
routerImg.post('/all', autenticacion, getAllImages)

module.exports = routerImg