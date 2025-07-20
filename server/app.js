require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors()) //esto es para que se pueda consumir desde el front
//app.use(express.urlencoded({extended:true})) //esto es para que se pueda consumir desde el front
const { rutaUser } = require("./routes/userRouter")
const { dogRoutes } = require("./routes/dogRoutes")
const { routerCat } = require("./routes/catRoutes")
app.use(express.json())

app.set('port', process.env.PORT || 6000) //esta es una variable 



app.use('/api/cats', routerCat);
app.use('/api/dogs', dogRoutes);
app.use('/usuario',rutaUser)
require('./controllers/bd.controller')

//aqui la utilizamos para escuchar al puerto 
app.use((error, res, req)=>{
    return res.status(500).json({ status: false, message: `Se ha generado un error ${error.message}`})
})
app.use((req, res)=>{
    return res.status(500).json({mensaje:"Ruta invalida"})
})

app.listen(app.get('port'), ()=>{
    console.log(`BIENVENIDOS A LA GALERIA DE MASCOTAS en el puerto: ${app.get('port')}`)
})

