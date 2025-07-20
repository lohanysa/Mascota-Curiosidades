const { getRandomCat, searchCatByBreed } = require('../controllers/catController')
const express = require('express')
const routerCat = express.Router()

routerCat.get('/random', getRandomCat)
routerCat.get('/search/:breed', searchCatByBreed)

module.exports = {
  routerCat}