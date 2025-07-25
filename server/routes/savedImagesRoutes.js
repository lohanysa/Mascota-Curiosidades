const express = require('express');
const routerImg = express.Router();
const {verificarToken} = require('../middleware/autenticacionMiddleware.js')
const { createImage,deleteImage,getAllImages } = require('../controllers/saveImagenController')

routerImg.post('/save',verificarToken, createImage)
routerImg.post('/all',verificarToken, getAllImages)
routerImg.delete('/delete/:id',verificarToken, deleteImage)

module.exports = routerImg