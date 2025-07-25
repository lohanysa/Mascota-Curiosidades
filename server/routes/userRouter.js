const express = require('express')
const { CrearUser, login, autenticacionControl,updateFullName } = require('../controllers/loginController')
const { UserRegistro, inicio, autenticacion,verificarToken } = require('../middleware/autenticacionMiddleware.js')
const rutaUser = express.Router()

rutaUser.post('/registro',UserRegistro , CrearUser)
rutaUser.post('/login',inicio ,login)
rutaUser.get('/profile',verificarToken, autenticacionControl)
rutaUser.put('/update',verificarToken, updateFullName)

module.exports={
    rutaUser
}