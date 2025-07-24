
const express = require('express')
const {autenticacion } = require('../middleware/autenticacionMiddleware.js')
const dogRoutes = express.Router()

const {
  getRandomDogImage,
  getDogByBreed,

} = require('../controllers/dogController');



dogRoutes.get('/random',autenticacion, getRandomDogImage);
dogRoutes.get('/breed/:breed',autenticacion, getDogByBreed);

module.exports = {
    dogRoutes    }