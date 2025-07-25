const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const RegistrarUser = require('../models/userModel');

const CrearUser = async (req, res)=>{

    try{
        //aqui debe ir la logica para hacer el insert a la BD
        const {username, full_name} = req.body;
        const password = bcrypt.hashSync(req.body.password,12)
       //esto lllama el modelo 
        const user = new RegistrarUser({
            username,
            full_name,
            password
        })
        //esto guarda la info en la base de datos
        await user.save()
        return res.status(202).json({status:true, mensaje:"se creo el usuario correctamente"})

    }catch(error){
        return res.status(500).json({ status: false, mensaje: error.message || error })
    }

}
const login= async (req, res)=>{
    try{
        //primero se busca el user

       const usuario = await RegistrarUser.findOne({ username: req.body.username })
        if(!usuario){
            return res.status(500).json({status:false, message : "usuario o contraseña incorrecta"})
        }
        //despues verifica el user
        if(!bcrypt.compareSync(req.body.password, usuario.password)){
             return res.status(500).json({status:false, message : "usuario o contraseña incorrecta"})
        }
        //y por ultimo el token
        const token = jwt.sign({usuario: usuario.username, nombre:usuario.full_name}, process.env.localkey,{expiresIn:'5h'})
        return res.status(200).json({token:token})
        //console.log("por ahora todo bien ")
    }catch(error){
      return res.status(500).json({ status: false, message: error })
    }
}



const autenticacionControl = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.localkey);

        // Buscar solo por username
        const usuario = await RegistrarUser.findOne({ username: decoded.usuario }).select('-password');
        if (!usuario) {
            return res.status(401).json({ message: "usuario no encontrado" });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message || error });
    }
}



const updateFullName = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.localkey);

        const { full_name } = req.body;
        if (!full_name) {
            return res.status(400).json({ message: "Nuevo nombre completo requerido" });
        }

        // Actualiza el full_name
        const usuario = await RegistrarUser.findOneAndUpdate(
            { username: decoded.usuario },
            { full_name: full_name },
            { new: true, select: '-password' }
        );

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message || error });
    }
};

module.exports={
    CrearUser,
    login,
    autenticacionControl,
    updateFullName
}