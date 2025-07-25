const jwt = require("jsonwebtoken")

const UserRegistro =(req,res, next)=>{

    const {username, full_name , password} = req.body;
    if(!username){
        return res.status(400).json({mensaje: "debe ingresar un nombre de usuario"}
        )
    }
    if(!full_name){
         return res.status(400).json({mensaje: "ingrese su nombre y apellido"})
    }
    if(!password || password.length <8){
         return res.status(400).json({mensaje: "la contraseña no puede estar vacio y debe ser mayor a 8 caracteres"})
    }

    next()
}

const inicio =(req, res, next)=>{
     const {username, password} = req.body;
    if(!username){
        return res.status(400).json({mensaje: "debe ingresar un nombre de usuario"}
        )
    }
    
     if(!password){
         return res.status(400).json({mensaje: "la contraseña no puede estar vacia"})
    }
    
    next()
}

const autenticacion =(req, res, next)=>{
    //aqui debo verificar que tenga el token 
    //esto se aplica a la ruta que se quiere protegen 
    try{
        const token = req.headers["authorization"].split(" ")[1] //aqui es para agarar el token que se envia , el esplit es para quitar la palabra beer que va con el token
        
        if(!token){
            return res.status(401).json({status: false, mensaje: "No se ha proporcionado un token de autenticación"})
        }

        jwt.verify(token, process.env.localkey, (error, data)=>{
            if(error){
                return res.status(500).json({status: false, mensaje: "Error al verificar el token"})
            }
            req.data = data//se adiciona la data en el req
            //la data es el nombre y usuario que se envia al crear el token 
            next()
        })

    }catch(error){
        return res.status(500).json({mensaje: "hubo un error en la autentificacion", message:error})
    }
}


module.exports= {
    UserRegistro,
    inicio,
    autenticacion
}