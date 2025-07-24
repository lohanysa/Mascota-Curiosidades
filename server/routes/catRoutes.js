const { getRandomCat, searchCatByBreed } = require('../controllers/catController')
const {autenticacion } = require('../middleware/autenticacionMiddleware.js')
const express = require('express')
const routerCat = express.Router()

routerCat.get('/random',autenticacion, getRandomCat)
routerCat.get('/search/:breed',autenticacion, searchCatByBreed)

module.exports = {
  routerCat}