import Joi from "joi";


const usuario= Joi.object({
    rol_idRol: Joi.number().integer().min(1).max(2).required().messages({
        "number.min":"El numero minimo para designar un usuario es el 1 ",
        "number.max":"El numero maximo para designar un usuario es el 2",
        "number.base":"El campo solicita un numero entero",
        "any.required":"El campo de rol es obligatorio"
    }),
    estados_idestados: Joi.number().min(1).required().messages({
        "number.base":"El campo solicita un numero entero",
        "number.min":"El numero minimo para designar un usuario es el 1 ",
         "any.required":"El campo de estados es obligatorio"
    }),
    correo_electronico: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
        "string.email": "El correo electrónico debe ser válido.",
        "any.required": "El correo electrónico es obligatorio."
    }),
    nombre_completo: Joi.string().min(3).max(50).required().messages({
        "string.base": "El nombre debe ser un texto.",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 carácteres",
        "string.max": "El nombre no puede exceder los 50 caracteres.",
        "any.required": "El nombre es obligatorio."
    }),
    contrasena: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
    .required()
    .messages({
        "string.pattern.base": "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.",
        "any.required": "La contraseña es obligatoria."
    }),
    telefono: Joi.string().min(8).max(8).required().messages({
        "string.base": "El telefono debe ir  en formato texto.",
        "string.empty": "El telefono no puede estar vacío.",
        "string.min": "El telefono debe contar con 8 caracteres",
        "string.max": "El telefono debe contar con 8 caracteres",
        "any.required": "El telefono es obligatorio."
    }),
    fecha_nacimiento: Joi.date().required().messages({
            "date.base": "La fecha de nacimiento debe ser válida.",
            "any.required": "La fecha de nacimiento es obligatoria."
    })

});

const ActualizacionDatosUsuario = Joi.object({
  
    nombre_completo: Joi.string().min(3).max(50).required().messages({
        "string.base": "El nombre completo debe ser una cadena de texto",
        "string.min": "El nombre completo debe tener al menos 3 caracteres",
        "string.max": "El nombre completo no puede superar los 50 caracteres",
    }),
    telefono: Joi.string().min(8).max(8).required().messages({
        "string.base": "El telefono debe ir  en formato texto.",
        "string.empty": "El telefono no puede estar vacío.",
        "string.min": "El telefono debe contar con 8 caracteres",
        "string.max": "El telefono debe contar con 8 caracteres",
        "any.required": "El telefono es obligatorio."
    }),
    fecha_nacimiento: Joi.date().iso().required().messages({
        "date.base": "La fecha de nacimiento debe ser válida",
        "date.format": "La fecha de nacimiento debe estar en formato ISO",
    }),
    idRol: Joi.forbidden().messages({
        "any.unknown": "El idRol no se puede modificar",
    }),
    fecha_creacion: Joi.forbidden().messages({
        "any.unknown": "La fecha_creacion no se puede modificar",
    }),
    correo_electronico: Joi.forbidden().messages({
        "any.unknown": "El correo electrónico no se puede modificar en esta ruta",
    }),
    contrasena: Joi.forbidden().messages({
        "any.unknown": "La contraseña no se puede modificar en esta ruta",
    }),
}).or('nombre_completo', 'telefono', 'fecha_nacimiento').messages({
    "object.missing": "Debe proporcionar al menos un campo para actualizar",
});
const cambiarEstadoUsuario= Joi.object({
    idUsuario: Joi.number().integer().min(1).required().messages({
        "number.min":"El numero minimo para un idUsuario es el 1 ",
       "number.base":"El campo solicita un numero entero",
        "any.required":"El campo de idUsuario  es obligatorio"
    })
});

const validarUsuario= (req,res,next)=>{
    const {error}=usuario.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({  errors: error.details.map((detail) => detail.message)});
       
    }
    next();
}
const validarActualizacionDatosUsuario= (req,res,next)=>{
   const {error}=ActualizacionDatosUsuario.validate(req.body,{abortEarly:false});
   if(error){
    return res.status(400).json({  errors: error.details.map((detail) => detail.message)});
   }
next();
}

const validacionEstadosUsuarios=(req,res,next)=>{
 const {error}= cambiarEstadoUsuario.validate(req.body,{abortEarly:false});
 if (error){
     return res.status(400).json({errors:error.details.map((detail)=>detail.message)});
 }
 next();
}
export {validarUsuario,validarActualizacionDatosUsuario,validacionEstadosUsuarios};