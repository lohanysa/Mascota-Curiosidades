const { getRandomCat, searchCatByBreed } = require('../controllers/catController')
const express = require('express')
const routerCat = express.Router()

routerCat.get('/random',autenticacion, getRandomCat)
routerCat.get('/search/:breed',autenticacion, searchCatByBreed)

module.exports = {
  routerCat}