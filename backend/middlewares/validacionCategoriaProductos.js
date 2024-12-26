import Joi from "joi";

const categoriaProductos=Joi.object({ 
    usuarios_idusuarios:  Joi.number().integer().min(1).required().messages({
            "number.min":"El numero minimo para un idUsuario es el 1 ",
           "number.base":"El campo solicita un numero entero",
            "any.required":"El campo de idUsuario  es obligatorio"
        }),
        nombre:  Joi.string().min(3).max(50).required().messages({
                "string.base": "El nombre completo debe ser una cadena de texto",
                "string.min": "El nombre completo debe tener al menos 3 caracteres",
                "string.max": "El nombre completo no puede superar los 50 caracteres",
            })
});
const actualizacionCategoriaProductos=Joi.object({
    idCategoriaProductos:Joi.number().min(1).required().messages({
        "number.min":"El numero minimo para un idCategoriaProductos es el 1 ",
       "number.base":"El campo solicita un numero entero",
        "any.required":"El campo de idcategoriaProductos es obligatorio"
    }), 
    usuarios_idusuarios:  Joi.number().integer().min(1).required().messages({
        "number.min":"El numero minimo para un idUsuario es el 1 ",
       "number.base":"El campo solicita un numero entero",
        "any.required":"El campo de idUsuario  es obligatorio"
    }),
    nombre:  Joi.string().min(3).max(50).required().messages({
        "string.base": "El nombre completo debe ser una cadena de texto",
        "string.min": "El nombre completo debe tener al menos 3 caracteres",
        "string.max": "El nombre completo no puede superar los 50 caracteres",
    })

}).or('idCategoriaProductos', 'usuarios_idusuarios', 'nombre').messages({
    "object.missing": "Debe proporcionar al menos un campo para actualizar",
});
const eliminarCategoriaProductos=Joi.object({
    idCategoriaProductos:Joi.number().min(1).required().messages({
        "number.min":"El numero minimo para un idCategoriaProductos es el 1 ",
       "number.base":"El campo solicita un numero entero",
        "any.required":"El campo de idcategoriaProductos es obligatorio"
    })
})
const validarCategoriaProductos= (req,res,next)=>{
    const {error}=categoriaProductos.validate(req.body,{abortEarly:false});
    if(error){
       return res.status(400).json({
            errors:error.details.map((detail)=>detail.message)
        });
    }
next();
}

const validarActualizacionCategoriaProductos= (req,res,next)=>{
    const {error}=actualizacionCategoriaProductos.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({
            errors:error.details.map((detail)=>detail.message)
        });
    }
next();
}
const validarEliminacionCategoriaProductos= (req,res,next)=>{
    const {error}=eliminarCategoriaProductos.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({
            errors:error.details.map((detail)=>detail.message)
        });
    }
next();
}
export {validarCategoriaProductos,validarActualizacionCategoriaProductos,validarEliminacionCategoriaProductos};