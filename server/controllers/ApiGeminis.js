require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai');
//const key = process.env.GEMINI_API_KEY


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//esta linea es para enviar la solicitud a la ia
exports.generarRespuesta = async (req, res)=> {
    const {prompt}= req.body


    //el prompt es la solicitud del cliente (osea la informacion a envia)
    //esto verifica que no este vacio
    if(!prompt){
        return res.status(400).json({error:"falta el prompt en el cuerpo de la solicitud "});
    }

    try{
        //se define el modelo a utilizar
        const model = genAI.getGenerativeModel({model: "gemini-2.5-pro"})
        
        //le pide al modelo que genere contenido del texto enviado
        const result = await model.generateContent(prompt);
        //se accede a la respuestaa de dio la IA
        const response = await result.response;
        //extrae el texto
        const text = response.text();

        res.json({respuesta: text});//envio la respuesta
    }catch(error){
        console.error('Error al generar respuesta ', error.message);
        res.status(500).json({error: "hubo un problema al generar la respuesta"})
    }
}