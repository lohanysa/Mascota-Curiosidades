require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('Conectado a mongoDB'))
    .catch(error =>console.error(' Error de conexion ', error))