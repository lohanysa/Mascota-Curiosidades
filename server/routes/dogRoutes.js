
const express = require('express')

const dogRoutes = express.Router()

const {
  getRandomDogImage,
  getDogByBreed,

} = require('../controllers/dogController');



dogRoutes.get('/random', getRandomDogImage);
dogRoutes.get('/breed/:breed', getDogByBreed);

module.exports = {
    dogRoutes    }