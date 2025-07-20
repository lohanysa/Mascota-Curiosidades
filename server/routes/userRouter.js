const express = require('express')
const { CrearUser, login, autenticacionControl } = require('../controllers/loginController')
const { UserRegistro, inicio, autenticacion } = require('../middleware/autenticacionMiddleware.js')
const rutaUser = express.Router()

rutaUser.post('/registro',UserRegistro , CrearUser)
rutaUser.post('/login',inicio ,login)
rutaUser.get('/profile',autenticacion, autenticacionControl)

module.exports={
    rutaUser
}