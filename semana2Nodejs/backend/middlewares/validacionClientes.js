import Joi from "joi";
const clientes= Joi.object({
    usuarios_idUsuario: Joi.number().integer().min(1).required().messages({
        "number.base":"El numero debe ser un entero",
        "number.min":"El idUsuario debe empezar por 1",
        "any.required":"El id es obligatorio"
    }),
    razon_social: Joi.string().min(1).max(245).messages({
        "string.base":"El campo debe ser una cadena de texto",
        "string.min":"El minimo de caracteres es 1",
        "string.min":"El maximo de caracteres es 245",
       
    }),
    nombre_comercial:Joi.string().min(1).max(250).messages({
        "string.base":"El campo debe ser una cadena de texto",
        "string.min":"El minimo de caracteres es 1",
        "string.min":"El maximo de caracteres es 250",
       
    }),
    direccion_entrega:Joi.string().min(1).max(450).required().messages({
        "string.base":"El campo debe ser una cadena de texto",
        "string.min":"El minimo de caracteres es 1",
        "string.min":"El maximo de caracteres es 450",
       })

});
const validarActualizacionClientes=(req,res,next)=>{
    const {error}=clientes.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({
            errors:error.details.map((detail)=>detail.message)
        });
    }
    next();
}
export{validarActualizacionClientes};