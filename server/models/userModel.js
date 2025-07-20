const mongoose = require("mongoose")

const UsuarioRegistrar= new mongoose.Schema({
    username: {type: String, required:true, unique:true, minlength:5, maxlength:15},
    password: {type: String,required:true,minlength:8},
    full_name: {type: String, required:true, minlength:5, maxlength:15}
})

const RegistrarUser = mongoose.model("Usuario", UsuarioRegistrar)


module.exports = RegistrarUser