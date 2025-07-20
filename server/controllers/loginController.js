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
        return res.status(202).json({mensaje:"ok", data: user})

    }catch(error){
        return res.status(500).json({ status: false, message: error })
    }

}
const login= async (req, res)=>{
    try{
        //primero se busca el user

       const usuario = await RegistrarUser.findOne({ username: req.body.username })
        if(!usuario){
            return res.status(500).json({status:false, message : "usuario incorrecta"})
        }
        //despues verifica el user
        if(!bcrypt.compareSync(req.body.password, usuario.password)){
             return res.status(500).json({status:false, message : "contraseña"})
        }
        //y por ultimo el token
        const token = jwt.sign({usuario: usuario.username, nombre:usuario.full_name}, process.env.localkey,{expiresIn:'3600s'})
        return res.status(200).json({token:token})
        //console.log("por ahora todo bien ")
    }catch(error){
      return res.status(500).json({ status: false, message: error })
    }
}



const autenticacionControl = async(req, res)=>{

    try{

    const usuario = await RegistrarUser.findOne({ username: req.data.usuario }).select('-password') //que busque el perfil pero sin traer el password

    if(!usuario){
        return res.status(401).json({message:"usuario no encontrado"})
    }

    return res.json(usuario)//en caso tal vaya todo bien entonces regresa al perfil del usuario 
    }catch(error){

        return res.status(500).json({ status: false, message: error })
    }
}
module.exports={
    CrearUser,
    login,
    autenticacionControl
}